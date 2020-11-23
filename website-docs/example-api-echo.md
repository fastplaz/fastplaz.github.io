---
id: example-api-echo
title: Example API (echo)
sidebar_label: API (echo)
---

Membuat API? Mudah kok. 

Sudah disediakan wizard di menu `File|New|FastPlaz|API Application...`.<br>

![echo](/img/example/api-echo-01.png)

Fungsi dari contoh ini untuk menampilkan ulang (_echo_) seluruh parameter, baik GET maupun POST, yang dikirim ke _endpoint_ API ini.

Disertakan pula `tools` buat anda yang ingin menggunakan [Docker](https://www.docker.com/), dan juga disediakan `builder` untuk dideploy ke platform _serverless_. Anda bisa mencobanya di Amazon Lambda.

## Kode Sumber

**Echo Example** tersedia di repository FastPlaz di [github.com/fastplaz/echo](https://github.com/fastplaz/echo). Silakan lakukan _git clone_ kemudian dikompilasi.

## Materi

Dari contoh ini bisa dipelajari tentang:

- Pembuatan API sederhana.
- JSON, baik membaca data json maupun membuat output berformat json.
- RAW BODY input.
- Membaca parameter melalui Method GET maupun POST.
- Pengenalan Docker.
- Pengenalan Serverless (Amazon Lambda).

### Docker

Tutorial cara _build_ API Echo ini melalui docker bisa dibaca di channel [Medium Luri Darmawan](https://medium.com/@luridarmawan/build-fastplaz-echo-project-with-docker-1271aea5f04d)

### Serverless

//TODO: tutorial serverless
