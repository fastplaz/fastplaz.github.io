---
id: example-default
title: Default Full Package Application
sidebar_label: Default Package
---

Contoh ini bisa anda dapatkan melalui tools [Create Full Package Application](/docs/usage#full-package-application) yang ada di menu `FastPlaz|Create Full Package Application`'

![Full Package Application](/img/showcase/fastplaz-dashboard.png)
_Menggunakan theme: Dashboard_

## Kode Sumber

Kode sumber sudah tersedia dalam kemasan FastPlaz, melalui tools [Create Full Package Application](/docs/usage#full-package-application) yang ada di menu `FastPlaz|Create Full Package Application`'

## Materi

Dari contoh ini bisa dipelajari tentang:

- [Template Engine](/docs/fte) dengan multiple _Theme_ dan [Tag](/docs/fte#tag)
    
    - Menampilkan [Flass Message](/docs/fte#tag-khusus) jika terdapat kesalahan.
    - Penggunaan `foreach` dan kondisional `if`
- Form Handle

  Disertai validasi dan proteksi sederhana dengan menggunakan CSRF.
- Upload File
  
  Dengan permission jenis file yang boleh diupload.
- Session 
- Akses ke database dengan menggunakan [ORM (Object Relationship Mapping)](/docs/orm)

  - Menampilkan data dalam bentuk list
  - Detail data
  - _Join_ ke tabel lain


## Screenshot

### Theme: Basic
![img](/img/example/default-theme-basic.png)

### Theme: Simple

![img](/img/example/default-theme-simple.png)

### Basic Example

![img](/img/example/default-01.png)

### Form Handling

![img](/img/example/default-02.png)

#### Success Submit

![img](/img/example/default-03.png)

### Akses Database dengan ORM

Menampilkan data warehouse
![img](/img/example/default-04.png)

Menampilkan data _Contacts_ berula _list_ dan _detail_. Termasuk penggunaan tag `if` sebagai kondisional saat menampilkan data.

![img](/img/example/default-04-1.png)

![img](/img/example/default-04-2.png)

### Login Page
![img](/img/example/default-05.png)

#### Success Login


![img](/img/example/default-06.png)


> Beberapa link sengaja tidak ditampilkan untuk kebutuhan latihan di dalam kelas. Anda bisa mengubahnya langsung dari _source_.
