---
id: upgrade
title: Upgrade ke Rilis 2026
sidebar_label: Upgrade ke Rilis 2026
description: Perubahan perilaku pada rilis November 2026 yang perlu dicek sebelum upgrade.
---

[Rilis 2026 "Hero"](/blog/2026/11/10/release-hero-2026) memperbaiki banyak bug yang ditemukan saat review menyeluruh terhadap `FastPlaz/src` dan `tools/src`. Sebagian besar perbaikan tidak terlihat dari sisi aplikasi, tapi beberapa di antaranya **bisa mengubah perilaku aplikasi yang sudah ada**. Cek daftar berikut sebelum upgrade.

## Cara Upgrade

```bash
cd fastplaz
git pull
```

Lalu _compile_ ulang package-nya di Lazarus: `fastplaz_runtime.lpk`, kemudian `fastplaz_tools.lpk` (compile dan install). Lihat juga [Instalasi](/docs/installation).

## Ringkasan

| Area | Perubahan |
| --- | --- |
| Redirect / die | Tidak keluar dari method; tambahkan `Exit` setelahnya |
| Session | Timeout dalam menit; direktori default `<TEMP>/sessions` |
| Model | `Save`/`Delete` yang gagal mengembalikan `False` + `Message` |
| Theme | `[flashmessages]` di-_encode_; pakai `html=1` untuk markup tepercaya |
| Proxy | Aktifkan `systems/trust_proxy` jika di belakang reverse proxy |
| reCAPTCHA | Selalu widget v2 |
| Integrasi | bmkg, clarifai, googleanalytics, kloudless, newrelic, office365, yandex, zomato ditandai _deprecated_ |
| Port | Standalone `17845` (dulu 8080), MCP Agent Plane `17826` |

## Wajib Dicek

### Redirect dan die tidak menghentikan kode

`Redirect()`, `die()`, dan `DieRaise()` mengirim response dan menandai aplikasi untuk berhenti, tapi **tidak keluar** dari method yang sedang berjalan. Kode setelahnya tetap dieksekusi.

```pascal
// sebelumnya: delete tetap jalan untuk user tanpa izin
if not isAllowed then
  Redirect(BaseURL + 'login');
Model.Delete(ID);

// sekarang
if not isAllowed then
begin
  Redirect(BaseURL + 'login');
  Exit;
end;
Model.Delete(ID);
```

Framework, modul CMS, dan controller hasil generator sudah melakukan `Exit` setelah setiap redirect. Periksa controller Anda sendiri untuk pola yang sama.

### Session timeout dalam menit

`systems/session_timeout` dan `SessionController.TimeOut` dihitung dalam **menit**, sesuai dokumentasi. Sebelumnya nilai dibandingkan dengan detik, sehingga default 3 hari (`4320`) kedaluwarsa setelah 72 menit. Jika sebelumnya Anda mengakalinya dengan nilai yang sangat besar, turunkan lagi.

### Direktori session

Jika `systems/session_dir` kosong, file session disimpan di `<TEMP>/sessions` (mengikuti variabel environment `TEMP`). `ztemp/sessions` hanya dipakai jika `TEMP` tidak ada atau tidak bisa ditulis. Isi `systems/session_dir` jika beberapa aplikasi di satu host tidak boleh berbagi session.

### Save dan Delete yang gagal mengembalikan False

`TSimpleModel.Save`, `Delete`, dan `SoftDelete` mengembalikan `False` dan mengisi `Message` jika gagal. Sebelumnya kegagalan langsung menghentikan request dengan halaman error.

```pascal
if not Model.Save('id=' + Model.QuoteValue(id)) then
begin
  LogUtil.Add(Model.Message, 'model');
  Exit;
end;
```

### Flash message di-encode

`[flashmessages]` meng-_encode_ setiap pesan sebagai HTML. Pesan yang memang berisi markup akan tampil sebagai teks. Gunakan `[flashmessages html=1]` hanya untuk pesan yang tepercaya.

### IP klien dan header proxy

`X-Forwarded-For` dan `Client-IP` diabaikan secara default karena bisa dipalsukan oleh klien. Jika aplikasi berada di belakang reverse proxy, aktifkan:

```json
"systems" : { "trust_proxy" : true }
```

### reCAPTCHA

API v1 sudah dimatikan Google. `TReCaptcha` hanya memakai `siteverify`, dan `THTMLUtil.ReCaptcha()` selalu menampilkan widget v2, apa pun nilai argumen `Version`-nya.

### Integrasi yang deprecated

Layanan berikut sudah tidak beroperasi. Class-nya masih bisa di-_compile_ tapi ditandai `deprecated` dan akan dihapus: `bmkg`, `clarifai`, `googleanalytics` (Universal Analytics), `kloudlesscalendar`, `newrelic`, `office365`, `yandextranslate`, `zomato`.

## Perlu Diketahui

### Database

- `QuoteIdentifier()` dan `QuotedTableName` meng-_quote_ nama tabel dan alias, sehingga nama seperti `order` atau `my-table` bisa dipakai.
- `QuoteValue()` meng-_quote_ nilai sesuai driver aktif. Gunakan untuk setiap nilai yang dimasukkan ke string `Where`.
- `SoftDelete` sudah berfungsi. Dengan `UseSoftDelete`, `Delete` menandai baris lewat `SoftDeleteField` (default `is_deleted`).
- `ExecScript` / `ExecSQLScript` menjalankan SQL multi-statement dalam satu transaksi (rollback jika gagal).
- `TSimpleModel.Create('')` menurunkan nama tabel dari nama class: `TUserGroupModel` menjadi `user_groups`.

### Theme

- Filter baru `escape` (alias `html`, `htmlspecialchars`): `[$name|escape]`.
- `[if]` mendukung `=`, `==`, `!=`, `<>`, `<`, `>`, `<=`, `>=`, _nesting_, HTML multi-baris, dan nilai ber-kutip.
- `[foreach]` bisa bersarang, dan dataset di-_rewind_ sebelum dirender.
- Nama template dari request disaring lewat `TThemeUtil.SafeTemplateName()`.
- Path include yang diawali `/` dihitung dari web root, bukan dari root drive.
- Page cache disimpan per session jika session berisi data.
- `ThemeUtil.View` sudah dihapus; gunakan `ThemeUtil.Render`.

### Keamanan

- Token CSRF dibuat per form, sehingga dua form di satu halaman tidak saling membatalkan. Cek dengan `isValidCSRF` di controller, tampilkan dengan `HTMLUtil.CSRF('formid')`.
- Cookie session `HttpOnly`, `SameSite=Lax`, dan `Secure` jika request lewat HTTPS.
- `SessionController.RegenerateID` membuat session id baru, misalnya setelah login.
- `RandomString()` memakai generator acak yang aman secara kriptografis (CSPRNG).
- Method HTTP yang tidak ditangani controller mendapat `405 Method Not Allowed`.
- `/initialize` menolak berjalan jika `config/config.json` sudah ada.
- `EnableCors` tidak lagi menggabungkan `*` dengan credentials; berikan origin eksplisit jika butuh credentials.

### Library

- `TJSONUtil` kembali menerima array sebagai root.
- `TMailer` mendukung Cc dan Bcc, dan bisa mengirim tanpa Synapse lewat SMTP client bawaan (`smtp_lib`).
- `TRedisLib` mendukung IPv6 dan menerapkan `TimeOut` saat koneksi.
- `DateTimeHuman()` mem-_parse_ tanggal tanpa bergantung pada locale.

### IDE Tools

- Nama module, controller, model, dan project otomatis diubah menjadi identifier Pascal yang valid (`my-app` → `myapp`, `2fa` → `_2fa`).
- Membatalkan wizard tidak lagi membuat file.
- _Create Theme Structure_ kembali menyalin theme default.
- Database Explorer memakai port yang dikonfigurasi dan menyimpan prefix tabel.

Detail teknis lengkap (Bahasa Inggris): [UPGRADE.md](https://github.com/fastplaz/fastplaz/blob/development/docs/UPGRADE.md) dan [CHANGES.md](https://github.com/fastplaz/fastplaz/blob/development/docs/CHANGES.md).
