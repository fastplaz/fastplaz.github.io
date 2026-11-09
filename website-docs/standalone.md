---
id: standalone
title: Standalone HTTP & CGI
sidebar_label: Standalone & CGI
description: Satu binary FastPlaz bisa berjalan sebagai HTTP server sendiri atau sebagai CGI, tanpa mengubah kode.
---

Mulai [rilis 2026 "Hero"](/blog/2026/11/10/release-hero-2026), aplikasi FastPlaz yang sama bisa berjalan sebagai **HTTP server standalone** atau sebagai **CGI**. Mode dipilih saat aplikasi dijalankan, tanpa mengubah kode.

- **CGI**: langsung dipasang di shared hosting (cPanel) atau Apache, seperti sebelumnya.
- **Standalone**: jalankan di komputer sendiri tanpa web server, atau sebagai _service_ di belakang nginx/Apache.

```bash
./myapp.bin                          # standalone: http://127.0.0.1:17845
./myapp.bin --mode=http --port=8081
# dijalankan Apache sebagai CGI: terdeteksi otomatis
```

## Pemilihan Mode

Mode ditentukan dengan urutan berikut:

1. Parameter `--mode=cgi` atau `--mode=http`.
2. Variabel environment `GATEWAY_INTERFACE`. Jika ada (aplikasi dijalankan oleh web server), mode CGI dipakai.
3. `systems/server/mode` di `config/config.json`.
4. Default: `http`.

Saat berjalan standalone, aplikasi menampilkan _startup banner_:

```
 ╔═╗ ╔═╗ ╔═╗ ╔╦╗ ╔═╗ ╦   ╔═╗ ╔═╗
 ╠╣  ╠═╣ ╚═╗  ║  ╠═╝ ║   ╠═╣ ╔═╝
 ╚   ╩ ╩ ╚═╝  ╩  ╩   ╩═╝ ╩ ╩ ╚═╝

   FastPlaz Standalone
 ➜ Local:   http://127.0.0.1:17845/
   Mode:    development
   Root:    D:\project\public_html
   FPC:     3.2.2 x86_64-Win64

   Press Ctrl+C to stop
```

Tekan **Ctrl+C** (atau kirim SIGTERM) untuk menghentikan server setelah request yang sedang berjalan selesai.

## Menyiapkan Project

Program harus memakai unit `fastplaz_app` sebagai pengganti `fpcgi`:

```pascal
uses
  {$IFNDEF Windows}cthreads,{$ENDIF}
  fastplaz_app, sysutils, fastplaz_handler, common, ...;
```

Project yang dibuat dengan wizard FastPlaz terbaru sudah memakainya. Saat membuat project baru (**File → New Project**), pilih **Run Mode** HTTP atau CGI.

Untuk project lama, ganti `fpcgi` dengan `fastplaz_app` di file `.lpr` **dan** di semua unit yang mencantumkannya:

```bash
grep -rlw fpcgi --include=*.pas --include=*.lpr source | xargs sed -i 's/\bfpcgi\b/fastplaz_app/'
```

:::note
Project lama yang masih `uses fpcgi` tetap berjalan sebagai CGI. Penggantian ke `fastplaz_app` hanya diperlukan untuk mode standalone, dan bisa dilakukan sebelum deploy karena di mode CGI keduanya berperilaku sama.
:::

## Konfigurasi

Tambahkan bagian `server` di `systems` pada `config/config.json`:

```json
"systems": {
  "trust_proxy": true,
  "server": {
    "mode": "http",
    "address": "127.0.0.1",
    "port": 17845,
    "static": false,
    "max_requests": 10000,
    "db_persistent": false,
    "db_idle_timeout": 300
  }
}
```

| Key | Keterangan |
| --- | --- |
| `mode` | `http` (default) atau `cgi` |
| `address`, `port` | Alamat yang didengarkan. Tetap `127.0.0.1` jika di belakang proxy |
| `static` | Melayani file asset theme sendiri. Isi `false` jika nginx/Apache yang melayaninya |
| `max_requests` | Berhenti setelah N request (0 = tidak pernah); _service manager_ menjalankan proses baru |
| `db_persistent` | Mempertahankan koneksi database antar request (default: ditutup setiap request, seperti CGI) |
| `db_idle_timeout` | Detik sebelum koneksi yang dipertahankan dibuka ulang |
| `trust_proxy` (di `systems`) | Membaca HTTPS/host/port/IP klien dari header `X-Forwarded-*`. Aktifkan **hanya** jika aplikasi di belakang proxy |

Parameter command line mengalahkan isi file: `--mode`, `--port`, `--address`, `--static=on|off`, `--max-requests=N`, `--root=<dir>`.

Direktori kerja adalah direktori binary jika di dalamnya ada `config/config.json`; jika tidak, gunakan `--root`.

## Reverse Proxy

Setiap proses menangani satu request dalam satu waktu. Untuk request paralel, jalankan beberapa proses di port berbeda dan daftarkan semuanya di proxy.

### nginx

```nginx
upstream fastplaz_app {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;      # satu baris per proses
}

server {
    listen 443 ssl;
    server_name example.com;
    root /var/www/example/public_html;

    location /themes/ { try_files $uri =404; }   # jika "static": false
    location ~ ^/(config|ztemp)/ { deny all; }

    location / {
        proxy_pass http://fastplaz_app;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Apache

```apache
<VirtualHost *:443>
    ServerName example.com
    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"
    ProxyPass        /themes/ !
    ProxyPass        / http://127.0.0.1:17845/
    ProxyPassReverse / http://127.0.0.1:17845/
    Alias /themes/ /var/www/example/public_html/themes/
</VirtualHost>
```

Module yang dibutuhkan: `mod_proxy`, `mod_proxy_http`, `mod_headers` (dan `mod_proxy_balancer` untuk beberapa proses).

## Menjalankan sebagai Service

### Linux (systemd)

`/etc/systemd/system/fastplaz-example@.service` (satu instance per port):

```ini
[Unit]
Description=FastPlaz example on port %i
After=network.target mysql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/example/public_html
ExecStart=/var/www/example/public_html/app.bin --port=%i
Restart=always
RestartSec=1
KillSignal=SIGTERM
TimeoutStopSec=10

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now fastplaz-example@8081 fastplaz-example@8082
journalctl -u fastplaz-example@8081 -f
```

`Restart=always` juga menjalankan proses baru setelah `max_requests` tercapai.

### macOS (launchd)

`~/Library/LaunchAgents/com.example.fastplaz.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.example.fastplaz</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/me/www/example/public_html/app.bin</string>
    <string>--port=8081</string>
  </array>
  <key>WorkingDirectory</key><string>/Users/me/www/example/public_html</string>
  <key>KeepAlive</key><true/>
  <key>RunAtLoad</key><true/>
</dict>
</plist>
```

```bash
launchctl load ~/Library/LaunchAgents/com.example.fastplaz.plist
```

### Windows (NSSM)

```bat
nssm install FastPlazExample8081 C:\www\example\public_html\app.bin --port=8081
nssm set FastPlazExample8081 AppDirectory C:\www\example\public_html
nssm set FastPlazExample8081 AppExit Default Restart
nssm set FastPlazExample8081 AppStdout C:\www\example\public_html\ztemp\logs\service.log
nssm start FastPlazExample8081
```

Windows akan meminta izin akses jaringan saat pertama kali dijalankan, kecuali alamatnya `127.0.0.1`.

## Checklist Deploy

- [ ] Semua `fpcgi` sudah diganti `fastplaz_app`
- [ ] `address` bernilai `127.0.0.1` jika ada proxy di depannya
- [ ] `trust_proxy` hanya aktif jika aplikasi hanya bisa diakses lewat proxy
- [ ] Folder `config/` dan `ztemp/` tidak dilayani oleh proxy
- [ ] Service menjalankan ulang proses (setelah `max_requests` atau _crash_)
- [ ] Database: koneksi per request (default), atau `db_persistent` dengan `db_idle_timeout` lebih kecil dari timeout server database

Contoh project lengkap ada di [examples/standalone](https://github.com/fastplaz/fastplaz/tree/development/examples/standalone).
