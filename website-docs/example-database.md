---
id: example-database
title: Akses Database
sidebar_label: Akses Database
---

Aplikasi ini menunjukkan contoh akses ke database. Menggunakan 3 model cara, yaitu

1. Direct Query,
2. ORM Model,
3. API. 

![Database](/img/example/database-0.png)

Aplikasi ini dibuat dengan sederhana untuk percontohan, tanpa menggunakan autentikasi/verifikasi.

## Kode Sumber

Kode sumber tersedia di [repositori Pascal Indonesia](https://github.com/pascal-id/database-with-fastplaz). Silakan lakukan `git clone` melalui repositori ini.

## Materi

Dari contoh ini bisa dipelajari tentang:

- [Template Engine](/docs/fte) dengan multiple _Theme_ dan [Tag](/docs/fte#tag)
    
    - Penggunaan `foreach`
- Akses ke database dengan menggunakan [ORM (Object Relationship Mapping)](/docs/orm)

  - Menampilkan data dalam bentuk list
  - _Join_ ke tabel lain
  - _Search_ melalui API

- Basic Javascript, menggunakan jQuery dan jsGrid
- Membuat **API**


## Screenshot

### Direct

Cara ini sepertinya cara yang sudah paling umum digunakan oleh para developer, dengan menggunakan query langsung untuk mengakses database.

![img](/img/example/database-direct.png)

### Model

Ini merupakan contoh cara akses database menggunakan cara ORM (Object Relation Mapping). Langkah-langkahnya akan semakin lebih mudah karena hanya perlu mendefinisikan field apa yang akan ditampilkan serta tabel relasinya. Hasilnya akan sama dengan cara direct access di atas, namun lebih simple cara penulisan kodenya.

![img](/img/example/database-model.png)

### API

Berikut ini merupakan contoh cara akses database menggunakan cara pemanggilan API. Cara menampilkannya dibantu dengan sedikit pemrograman Javascript, kali ini memanfaatkan pustaka jQuery.

![img](/img/example/database-api.png)

---

> Beberapa link sengaja tidak ditampilkan untuk kebutuhan latihan di dalam kelas. Anda bisa mengubahnya langsung dari _source_.
