---
id: installation
title: Instalasi
sidebar_label: Instalasi
---

## Prerequisite

* [FPC](https://www.freepascal.org/) / [Free Pascal Compiler](https://www.freepascal.org/), version 3.2.0
* [Lazarus](https://www.lazarus-ide.org/) (optional)
* [Git Client](https://www.git-scm.com/)

## Persiapan

### Download / Clone

Download atau clone terlebih dahulu repositori ini.

```bash
$ git clone -b development https://github.com/fastplaz/fastplaz.git
```

Disarankan menggunakan cara clone ini dibandingkan dengan download manual. Jika nanti ada update atau perubahan, Anda cukup melakukan `pull` saja.

```bash
$ git pull
```

Dengan cara ini yang akan diambil hanya perubahannya saja, tidak perlu mengunduh ulang keseluruhan file. Selanjutnya Anda cukup compile ulang saja file-file package-nya.

### Instalasi

Jika Anda adalah pengguna [Lazarus](https://www.lazarus-ide.org/), instalasi untuk penggunaan dasar FastPlaz amat sangat mudah, cukup lakukan langkah ini:

1. Buka file `tools/fastplaz_runtime.lpk`, lalu compile.
2. Buka file `tools/fastplaz_tools.lpk`, lalu compile dan install.

Hasilnya akan keluar menu seperti ini di toolbar menu FastPlaz.

![Menu FastPlaz](/img/fastplaz/lazarus-menu.png)

Dan akan terlihat tambahan pilihan baru di menu `File|New Project ...` seperti ini

![Menu FastPlaz](/img/fastplaz/lazarus-menu-new-project.png)

