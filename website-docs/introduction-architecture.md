---
id: architecture
title: Arsitektur
sidebar_label: Arsitektur (MVC)
---

Konsep dasar arsitektur FastPlaz sebenarnya sangat sederhana. Memisahkan antara rutin-rutin eksekutor, pengolah data dan penampilnya. Secara umum dikenal dengan sebutan MVC _(Model-View-Controller)_. 

Konsep seperti ini sudah sangat umum dijumpai di framework-framework aplikasi berbasis web dan mobile pada umumnya. 
Banyak framework aplikasi web (termasuk PHP, Django, Ruby on Rails, dll) mengutilisasi MVC sebagai arsitektur software-nya.

## MVC 

![Arsitektur MVC](/img/fastplaz/mvc.png)

### Model

Mendefinisikan data untuk aplikasi (biasanya, data tersebut disimpan di dalam database server).

### View

Menghasilkan suatu interaksi yang dapat dilihat oleh pengguna (biasanya, halaman web). Komponen View menghasil informasi ke user dan mengirimkan action ke Controller untuk manipulasi data.

### Controller

pada dasarnya, merupakan interface antara View dan Model. Melakukan proses terhadap action yang diberikan oleh user, melakukan pengolahan data dari database, dan mengirimkan hasilnya ke View untuk dikirimkan ke layar user.


Salah satu keutamaan dari arsitektur MVC ini adalah abstraksi dari ketiga komponen tersebut. 

## File dan Direktori

### Struktur

Hasil project yang dibuat menggunakan FastPlaz secara default memiliki struktur direktori seperti berikut:

```bash
├── docs
├── public_html
│   ├── config
│   ├── files
│   │   └── images
│   ├── modules
│   │   ├── contacts
│   │   └── employees
│   ├── themes
│   │   └── simple
│   │       ├── assets
│   │       ├── plugins
│   │       └── templates
│   └── ztemp
└── source
    ├── api
    │   ├── controllers
    │   └── routes
    ├── app
    │   ├── controllers
    │   └── routes
    ├── common
    │   ├── controllers
    │   └── models
    └── sql
```

Seluruh source pascal bisa ditempatkan di dalam direktori `source`. Disarankan mengelompokkannya berdasarkan fungsional masing-masing file tersebut. Setiap _project_ biasa membutuhkan setidaknya direktori `controller`, `route`, `model`.

Sedangkan isi dari folder `public_html` merupakan file-file yang bisa Anda publish/upload ke server tujuan.

### Konfigurasi

File konfigurasi terletak di file `config/config.json`, dengan struktur sebagai berikut:

```json
{
  "systems" : {
    "sitename" : "FastPlaz Example",
    "slogan" : "FastPlaz App Example",
    "baseurl" : "",
    "admin_email" : "webmaster@coba.com",
    "development" : true,
    "debug" : true,
    "module_default" : "main",
    "language_default" : "id",
    "theme_enable" : true,
    "theme" : "Dashboard",
    "cache" : "none",
    "temp" : "ztemp",
    "error_url" : "\/",
    "session_timeout" : 0,
    "error_redirect" : false
  },
  "database" : {
    "default" : {
      "driver" : "MySQL 5.7",
      "hostname" : "localhost",
      "port" : "",
      "username" : "your_username",
      "password" : "your_password",
      "database_name" : "the_database_name",
      "charset" : "",
      "prefix" : "",
      "version_check": false,
      "library" : ""
    }
  },
  "mailer" : {
    "default" : {
      "hostname" : "your.smtp.server",
      "username" : "your_username",
      "password" : "the_password",
      "smtp_port" : "465",
      "ssl" : true,
      "tls" : true
    }
  }
}
```