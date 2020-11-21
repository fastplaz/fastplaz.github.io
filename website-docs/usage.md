---
id: usage
title: Create New Project
sidebar_label: Create New Project
---

## Prerequisite

Pastikan [prerequisite](/docs/installation#prerequisite) di bagian [instalasi](/docs/installation#prerequisite) sudah terpenuhi.

## Struktur

Hasil project yang dibuat menggunakan FastPlaz secara default memiliki struktur direktori seperti berikut:

```bash
├── docs
├── public_html
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

Disarankan memisahkan antara masing-masing controller, models maupun routes-nya.

Berikut ini adalah contoh struktur _project_ dari aplikasi yang di _generate_ menggunakan fitur [Full Package Application](/docs/usage#full-package-application)

```bash
.
├── app
│   ├── build.sh
│   ├── clean.sh
│   ├── controllers
│   │   ├── app_controller.pas
│   │   ├── database_controller.pas
│   │   ├── example_controller.pas
│   │   └── example_form_controller.pas
│   ├── extra.cfg
│   ├── fastplaz.lpi
│   ├── fastplaz.lpr
│   ├── fastplaz.lps
│   └── routes
│       └── app_routes.pas
├── common
│   ├── controllers
│   └── models
│       ├── db_model.pas
│       └── warehouse_model.pas
└── sql
    └── db.sql
```

Terlihat pula penamaan file-nya yang seragam, dan mudah dibaca.

### Penamaan

FastPlaz menyarankan standarisasi penamaan file-file unit di dalam project. Setiap nama file diawali dengan 'nama tugasnya', diikuti dengan fungsinya (_controller,_model,_route). Penamaan tugaspun sebaiknya disesuaikan dengan `permalink` yang akan digunakan.

Misal akan membuat controller untuk menangani url `http://localhost/employee`, maka nama file unit controller-nya menjadi `employee_controller.pas`.

Demikian juga untuk file model yang akan mengakses table `employees`, maka nama file unit model-nya adalah `employee_model.pas`.

```note
url: http://localhost/employee
tabel: employees
file controller : employee_controller.pas
file model      : employee_model.pas
```

## Wizard

Wizard ini merupakan salah satu fitur dari FastPlaz yang digunakan untuk memudahkan _engineer_ dalam membuat aplikasi. Hanya dengan beberapa klik, fitur-fitur yang diinginkan telah terbentuk dengan otomatis.

### Aplikasi Simple dan API

Membuat FastPlaz Project baru bisa dilakukan melalui menu `File|New Project ...`.

![Menu FastPlaz](/img/fastplaz/lazarus-menu-new-project.png)

Ada 2 pilihan:

1. Simple Application
   Membuat aplikasi sederhan berbasis FastPlaz disertai dengan simple theme yang sudah disediakan. Menu ini membantu untuk para developer yang akan membuat _custom project_.
2. API Application
   Membuat API (_Application Programming Interface_) akan semakin mudah melalui menu ini. Hasilnya akan di buat file-project disertai dengan contoh output **JSON**-nya.

Selanjutnya akan muncul _dialog_ sepert ini:
![Menu FastPlaz](/img/fastplaz/wizard-api.png)

Isikan nama _project_ sesuai kebutuhan Anda, dan juga `webroot directory` yang merupakan direktori tempat website tersebut dibaca oleh web server.

Pilih opsi `generate structure` jika Anda ingin dibuatkan struktur direktori aplikasi/api secara otomatis. Untuk pemula disarankan memilih opsi ini.

Jika Anda membuat API yang memerlukan parsing parameter di `Header`, isikan nama-nama variabel header yang akan digunakan. Pada API, biasanya memerlukan header seperti `token`, `client-id`, `client-secret` dan lain lain.


### Full Package Application

**Ingin membuat aplikasi yang lebih kompleks dan canggih?** Ada akses ke database dan juga beberapa pilihan _theme_ yang menarik? Silakan gunakan pilihan ini.

![Menu FastPlaz](/img/fastplaz/lazarus-menu-hint.png)

Kemudian isikan nama _project_ dan target direktori tempat aplikasi akan dibuat.

![Menu FastPlaz](/img/fastplaz/wizard-package.png)

Selanjutnya akan terbentuk direktori dan file seperti berikut
![Menu FastPlaz](/img/fastplaz/wizard-package-result.png)

Sudah disediakan _theme_ siap pakai:
1. Basic
2. Simple
3. Dashboard

Jika proses kompilasi berhasil, tampilan di browser akan indah seperti ini:
![Menu FastPlaz](/img/fastplaz/wizard-package-view.png)

Di template ini sudah disediakan contoh kode untuk
1. Pengelolaan form, dengan security sederhana menggunakan CSRF.
   Method POST dan upload file.
2. Akses view ke database.
   Untuk akses database menggunakan ajax (jsGrid) bisa dilihat dari repo [Database Example](https://github.com/pascal-id/database-with-fastplaz).
3. Membaca variabel dari _query string_.
4. Penggunaan Session.
5. Penggunaan layout modul kustom.
6. Penggunaan global layout kustom untuk halaman **Home**.
7. Pemanfaatan (assign) variabel di theme.
8. Flash Messages

FastPlaz juga menyedikan beberapa variabel tag yang bisa digunakan di theme anda. Detil informasinya bisa dibaca di dokumen ini di bagian [FTE - FastPlaz Theme Engine](/docs/fte).

