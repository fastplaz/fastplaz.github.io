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
| [include](/docs/fte#include) | Menyisipkan file .html ke dalam dokumen html<br>`[include file="includes/head"]` |
| [foreach](/docs/fte#foreach) | Perulangan untuk menampilan data, baik dari tabel, array maupun json |
| [if](/docs/fte#foreach) | Pengkodisian |
| filter | Melakukan _filtering_ terhadap suatu variabel. Saat ini tersedia: nl2br, uppercase, lowercase, ucwords, moreless, dateformathuman, permalink, multifilter.<br>contoh: `[$FullName filter=uppercase]` |
| assign | Melakukan assign suatu nilai ke dalam variabel |
| assignto | Melakukan assign nilai dari suatu field tabel  ke dalam variabel |
| block | block controller |

### Tag Khusus

Dengan beberapa **[tag]** khusus seperti:

| Tag  | Description |
|---|---|
| title | Menampilkan `sitename` sesuai di config.json |
| slogan | Menampilkan `slogan` sesuai di config.json |
| baseurl | Menampilkan `baseurl` sesuai di config.json |
| thisurl | URL aktif saat ini |
| theme | Nama theme yang digunakan saat ini|
| themepath | Path dari theme yang digunakan |
| themefullpath | Path lengkap beserta BaseURL dari theme yang digunakan.<br>`<link rel="stylesheet" href="[themefullpath]/styles/style.css">` |
| datetime | Menampilkan tanggal dan waktu |
| time | Menampilkan waktu |
| date | Menampilkan tanggal |
| env | Mendapatkan nilai dari variabel environment,<br> misal: `[env key="HTTP_REFERER"]`
|
| loadtime | Menampilkan lama waktu proses aplikasi dan milidetik |
| flashmessages | Menampikan Flash Message, bisa digunakan untuk menyimpan pesan kesalahan |
| maincontent | Lokasi untuk menampilkan konten utama setiap modul |


### Featured Tag

Dan beberapa _featured tag_:

| Tag  | Description |
|---|---|
| recaptcha | Menampilkan [ReCaptcha](https://www.google.com/recaptcha/about/) untuk lebih mengamankan form yang kita buat.<br>`[recaptcha key="your_public_key"]`|
| csrf-token | CSRF Token sebagai langkah sederhana untuk mengamankan form.<br>`[csrf-token name="optionalModuleName"]` |
| gt | GetText, Multi language support.<br>`[gt text="Welcome"]` |


## Contoh Penggunaan

Contoh lebih lengkap tentang penggunaan `tag` ini bisa dipelajari dari _example_ yang sudah disediakan, khususnya dari hasil generasi _Full Package Application_.

### include

`include` berfungsi untuk menyisipkan file .html ke dalam dokumen. Lokasi file merujuk pada direktori dari theme yang dipakai saat itu.

Jika saat itu sedang menggunakan theme `Dashboard` dan ditemukan tag `[include file="includes/head"]` maka file akan merujuk ke `themes/Dashboard/templates/includes/head.html`.

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


### foreach

`foreach` merupakan perulangan yang berfungsi untuk menampilkan isi dari suatu data yang bertipe table, array ataupun json.

Format penggunaan `foreach`
```bash
[foreach from=$VariableName item=row type=table]
  
  html content: [row.nama_field]

[/foreach from=$VariableName]
```

`$VariableName` didefinisikan melalui kode di dalam kontroller Anda.
```pascal
ThemeUtil.AssignVar['$VariableName'] := @Model.Data;
```

Kode HTML berikut ini juga mencontohkan penggunaan `if` di dalam blok `foreach`.

```bash
<table>
  <thead>
    <tr><th>&nbsp;</th><th>Name</th><th>Address</th><th></th></tr>
  </thead>
  <tbody>
    [foreach from=$Contacts item=aItem type=table]
      [aItem.sex assignto=$JK]
      <tr><td>[$index].</td><td>[aItem.first_name] [aItem.last_name]</td><td>[aItem.address]</td><td>[if $JK eq "0"]Laki[else]Perempuan[/if]</td></tr>
    [/foreach from=$Contacts]
  </tbody>
</table>
```
Hasilnya:
![Foreach](/img/fastplaz/fte-foreach.png)

### assignto

`assignto` berfungsi untuk melakukan assign nilai dari suatu field tabel ke dalam variabel. Biasanya berguna jika ada proses pengkondisian terhadap field tersebut.

Jika terdapat suatu field `sex` dari tabel `contacts` yang berisi nilai 0 atau 1 yang berarti lelaki atau perempuan, maka kode di html-nya akan seperti contoh ini:

```bash
[foreach from=$Contacts item=aItem type=table]
  [aItem.sex assignto=$JK]
  <tr><td>[$index].</td><td>[aItem.first_name] [aItem.last_name]</td><td>[aItem.address]</td><td>[if $JK eq "0"]Laki[else]Perempuan[/if]</td></tr>
[/foreach from=$Contacts]
```

---

//TODO: Assign