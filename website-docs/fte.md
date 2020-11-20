---
id: fte
title: FastPlaz Template Engine
sidebar_label: Template Engine
---

**FTE (FastPlaz Template Engine)** adalah _template engine_ sederhana yang ditulis dalam Pascal untuk penggunaan bersama [FastPlaz](https://fastplaz.com). FTE **memisahkan** antara **logika bisnis** (kode Pascal) dengan **logika presentasi** (_view_) secara dinamis dengan mengizinkan peletakan _tag_ khusus di dalam sebuah dokumen HTML.

**FTE** juga memiliki kemampuan untuk melakukan _cache_ dan juga kompresi sederhana terhadap dokumen HTML.

Dengan kemampuan **FTE** untuk memisahkan antara logika bisnis dan logika presentasi, akan memudahkan berbagi peran antara _Developer_ dengan _UI Engineer_. _UI Engineer_ bisa melakukan tugasnya tanpa perlu terlibat langsung di dalam pembuatan logika bisnisnya (Pascal), dan demikian juga sebaliknya.

## Theme

**FTE** memberikan kesempatan kepada para _developer_ untuk bebas membuat berbagai macam **theme** dalam aplikasinya. FTE menyarankan penggunaan struktur direktori dan file sepert di bawah ini.

```bash
├── public_html
│   ├── config
│   ├── files
│   │   └── images
│   ├── modules
│   │   ├── contacts    👈 presenter/view untuk module Contact
│   │   └── employees   👈 presenter/view untuk module Employee
│   ├── themes
|   |   ├── ThemeCantik 👈 theme ThemeCantik
|   |   ├── Dashboard   👈 theme Dashboard
│   │   └── simple      👈 theme Simple
│   │       ├── assets
│   │       ├── plugins
│   │       └── templates
│   └── ztemp
```
Pemilihan theme default yang digunakan bisa dilakukan melalui file konfigurasi di `config.json`.

```json
{
  "systems" : {

    "theme_enable" : true,
    "theme" : "Dashboard",  👈 pilih theme di sini

  }
}
```

Contoh layout `master` HTML di dalam theme `Basic`.
```html
<!DOCTYPE html>
<html>
[include file="includes/head"]
<body id="page-top">
    [include file="includes/navigation"]
    <div id="main">
        <div class="container">
            <h3>[$Title filter=ucwords]</h3>
        </div>
        [maincontent]
    </div>
    [include file="includes/footer"]
</body>
</html>
```

Terlihat sangat sederhana dengan menggunakan `Tagging`.
Detilnya bisa Anda pelajari dari contoh file yang tersedia di [repository](https://github.com/fastplaz/fastplaz/tree/master/tools/templates/packages/Simple/public_html/themes/Basic).

## Tag

**FTE** mempunyai kemampuan untuk mengolah HTML dengan memanfaatkan kode `Tag` tertentu.

### Tag Konstruksi

Beberapa konstruksi yang tersedia di FTE

| Tag  | Description |
|---|---|
| include | Menyisipkan file .html ke dalam dokumen html<br>`[include file="includes/head"]` |
| foreach | Perulangan untuk menampilan data, baik dari tabel, array maupun json |
| if | Pengkodisian |
| filter | Melakukan _filtering_ terhadap suatu variabel. Saat ini tersedia: nl2br, uppercase, lowercase, ucwords, moreless, dateformathuman, permalink, multifilter.<br>contoh: `[$FullName filter=uppercase]` |
| assign | Melakukan assign suatu nilai ke dalam variabel |
| block | block controller |

### Tag Khusus

Dengan beberapa **[tag]** khusus seperti:

| Tag  | Description |
|---|---|
| $title | Menampilkan `sitename` sesuai di config.json |
| $slogan | Menampilkan `slogan` sesuai di config.json |
| $baseurl | Menampilkan `baseurl` sesuai di config.json |
| $thisurl | URL aktif saat ini |
| $theme | Nama theme yang digunakan saat ini|
| $themepath | Path dari theme yang digunakan |
| $themefullpath | Path lengkap beserta BaseURL dari theme yang digunakan.<br>`<link rel="stylesheet" href="[$themefullpath]/styles/style.css">` |
| datetime | Menampilkan tanggal dan waktu |
| time | Menampilkan waktu |
| date | Menampilkan tanggal |
| $env | Mendapatkan nilai dari variabel environment,<br> misal: `[$env key="HTTP_REFERER"]`
|
| loadtime | Menampilkan lama waktu proses aplikasi dan milidetik |
| flashmessages | Menampikan Flas Message, bisa digunakan untuk menyimpan pesan kesalahan |


### Featured Tag

Dan beberapa _featured tag_:

| Tag  | Description |
|---|---|
| recaptcha | Menampilkan [ReCaptcha](https://www.google.com/recaptcha/about/) untuk lebih mengamankan form yang kita buat.<br>`[recaptcha key="your_public_key"]`|
| csrf-token | CSRF Token sebagai langkah sederhana untuk mengamankan form.<br>`[csrf-token name="optionalModuleName"]` |
| gt | GetText, Multi language support.<br>`[gt text="Welcome"]` |

---

//TODO: Assign