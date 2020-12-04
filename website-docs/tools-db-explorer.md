---
id: db-explorer
title: Database Explorer
sidebar_label: Database Explorer
---

Utilitas **Database Explorer** ini sangat bermanfaat buat yang males bolak-balik switch windows dr IDE/Editor ke DB browser lalu balik lagi ke editor, lalu bolak lagi ke sana.

Utilitas **Database Explorer** ini sangat bermanfaat dalam mengelola database. Cukup untuk kebutuhan sederhana seperti `select`, `view` table dan sebagainya.

<video controls width="720px">
  <source src="https://github.com/fastplaz/fastplaz.github.io/raw/master/videos/db-explorer-intro.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Sesuai [SQLdb](https://wiki.freepascal.org/SQLdb_Tutorial1) yang sudah didukung oleh free-pascal, **Database Explorer** ini mendukung koneksi ke database: MySQL, Firebird, ODBC, Oracle, PostgreSQL, SQLite3.

## Fitur

### Copy fields name to source editor

Salah satu kendala yang sering dijumpai oleh _developer_ adalah kadang kala mereka lupa nama field apa saja yang ada di suatu table, dan mesti bolak-balik antara aplikasi database explorer-nya (cth: phpmyadmin) ke Lazarus untuk menulis ulang nama-nama field dari table tersebut ke kode sumbernya.

Naah... _tools_ ini memudahkan untuk melakukan hal tersebut. Dari nama table yang ada di dalam daftar kemudian klik-kanan, selanjutnya akan muncul pilihan menu ini.

![copy field](/img/tools/field-copy-2.png)


Yang akan terjadi nanti baris nama-nama field dari tabel tersebut akan tertulis di editor kode sumber dan tersedia pula di _clipboard_.


### Auto generate model

Selain dari menu yang ada di menu utama FastPlaz, [membuat model](/docs/usage-model#membuat-model) juga bisa dilakukan Database Explorer. Cukup klik-kanan dari nama tabel, lalu pilih menu `Create ORM Table`.

![copy field](/img/tools/orm.png)
