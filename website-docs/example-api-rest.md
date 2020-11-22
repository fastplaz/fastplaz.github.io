---
id: example-api-rest
title: REST API
sidebar_label: REST API
---

Membuat API? Mudah kok. Sudah disediakan wizard di menu <br>`File|New|FastPlaz|API Application...`.

![REST](/img/example/rest-0.png)

Kode sumber ini merupakan contoh sederhana implementasi REST (API) dengan menggunakan [FastPlaz](https://fastplaz.com). Tanpa disertakan check permission dan validasi input. Contoh ini menunjukan proses membaca data, menambah, mengubah dan menghapus data _customer_ melalui protokol REST.

Contoh ini telah dicoba di environment Linux dan Mac. Untuk pengguna Windows, dipersilakan menyesuaikan khususnya untuk penamaan path/folder/directory.

| End point | Method | Deskripsi |
|---|---|---|
| /customer | Post | Menambah data kustomer |
| /customer | Get | Menampilkan data kustomer. Parameter yang tersedia:<br>- limit<br>- offset |
| /customer/{id}/ | Get | Menampil data kustomer spesifik berdasarkan `id`-nya. |
| /customer/{id}/profile | Get | Menampilkan Data Detail (_customer profile_) |
| /customer/{id}/ | Put | Mengubah seluruh profil kustomer |
| /customer/{id}/ | Patch | Mengubah sebagian profil kustomer |
| /customer/{id}/ | Delete | Menghapus kustomer |

## Kode Sumber

**REST API Example** tersedia di repository FastPlaz di [github.com/fastplaz/example-rest](https://github.com/fastplaz/example-rest). Silakan lakukan _git clone_ kemudian dikompilasi. Ikuti langkah-langkah di _readme_.

## Materi

Dari contoh ini bisa dipelajari tentang:

- Pembuatan API sederhana.
- REST Protocol
- JSON, baik membaca data json maupun membuat output berformat json.
- Membaca parameter melalui Method GET maupun POST.
- Routing dengan _pattern regex_.
- Database dengan [ORM](/docs/orm/) [Model](/docs/usage-model)
- Automation Test

## Referensi

- [Understanding REST](https://github.com/fastplaz/fastplaz/blob/development/REST.md)

> Note: Matikan mode debug (Log) jika digunakan untuk server production.

