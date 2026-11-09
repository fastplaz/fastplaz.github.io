---
id: standalone
title: Standalone HTTP & CGI
sidebar_label: Standalone & CGI
description: One FastPlaz binary can run as its own HTTP server or as CGI, without code changes.
---

From the [2026 "Hero" release](/blog/2026/11/10/release-hero-2026), the same FastPlaz application can run as a **standalone HTTP server** or as **CGI**. The mode is chosen when the application starts, without changing code.

- **CGI**: deploy directly on shared hosting (cPanel) or Apache, as before.
- **Standalone**: run it on your own computer without a web server, or as a service behind nginx/Apache.

```bash
./myapp.bin                          # standalone: http://127.0.0.1:17845
./myapp.bin --mode=http --port=8081
# started by Apache as CGI: detected automatically
```

## Choosing the Mode

The mode is decided in this order:

1. The `--mode=cgi` or `--mode=http` parameter.
2. The `GATEWAY_INTERFACE` environment variable. If it is set (the application was started by a web server), CGI mode is used.
3. `systems/server/mode` in `config/config.json`.
4. Default: `http`.

When running standalone, the application prints a startup banner:

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

Press **Ctrl+C** (or send SIGTERM) to stop the server after the request in progress finishes.

## Preparing the Project

The program must use the `fastplaz_app` unit instead of `fpcgi`:

```pascal
uses
  {$IFNDEF Windows}cthreads,{$ENDIF}
  fastplaz_app, sysutils, fastplaz_handler, common, ...;
```

Projects created with the latest FastPlaz wizard already use it. When creating a new project (**File → New Project**), choose HTTP or CGI as the **Run Mode**.

For an existing project, replace `fpcgi` with `fastplaz_app` in the `.lpr` file **and** in every unit that lists it:

```bash
grep -rlw fpcgi --include=*.pas --include=*.lpr source | xargs sed -i 's/\bfpcgi\b/fastplaz_app/'
```

:::note
Existing projects that still have `uses fpcgi` keep running as CGI. Switching to `fastplaz_app` is only needed for standalone mode, and it can be done before deploying because both units behave the same in CGI mode.
:::

## Configuration

Add a `server` section under `systems` in `config/config.json`:

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

| Key | Description |
| --- | --- |
| `mode` | `http` (default) or `cgi` |
| `address`, `port` | Listen address. Keep `127.0.0.1` behind a proxy |
| `static` | Serves theme asset files itself. Set to `false` when nginx/Apache serves them |
| `max_requests` | Stop after N requests (0 = never); the service manager starts a fresh process |
| `db_persistent` | Keep database connections between requests (default: closed after each request, as in CGI) |
| `db_idle_timeout` | Seconds before a kept connection is reopened |
| `trust_proxy` (in `systems`) | Takes HTTPS/host/port/client IP from the `X-Forwarded-*` headers. Enable it **only** when the application is behind a proxy |

Command line options override the file: `--mode`, `--port`, `--address`, `--static=on|off`, `--max-requests=N`, `--root=<dir>`.

The working directory is the directory of the binary when it contains `config/config.json`; otherwise use `--root`.

## Reverse Proxy

Each process handles one request at a time. For parallel requests, run several processes on different ports and list them all in the proxy.

### nginx

```nginx
upstream fastplaz_app {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;      # one line per process
}

server {
    listen 443 ssl;
    server_name example.com;
    root /var/www/example/public_html;

    location /themes/ { try_files $uri =404; }   # with "static": false
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

Required modules: `mod_proxy`, `mod_proxy_http`, `mod_headers` (and `mod_proxy_balancer` for several processes).

## Running as a Service

### Linux (systemd)

`/etc/systemd/system/fastplaz-example@.service` (one instance per port):

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

`Restart=always` also starts a fresh process after `max_requests` is reached.

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

Windows asks for network access permission the first time it runs, unless the address is `127.0.0.1`.

## Deployment Checklist

- [ ] Every `fpcgi` has been replaced with `fastplaz_app`
- [ ] `address` is `127.0.0.1` when a proxy is in front
- [ ] `trust_proxy` is on only when the application can be reached only through the proxy
- [ ] The `config/` and `ztemp/` folders are not served by the proxy
- [ ] The service restarts the process (after `max_requests` or a crash)
- [ ] Database: a connection per request (default), or `db_persistent` with a `db_idle_timeout` lower than the database server timeout

A complete example project is in [examples/standalone](https://github.com/fastplaz/fastplaz/tree/development/examples/standalone).
