---
id: usage-routing
title: Routing
sidebar_label: Routing
---

**_Routing_** merupakan suatu metode untuk memetakan URL ke _action_ dari _controller_. Dengan menentukan `route`, Anda dapat memisahkan bagaimana aplikasi diimplementasikan dari bagaimana struktur URL-nya (permalink/slug).

Routing sebenarnya bisa dilakukan juga melalui file `.htaccess` dari Apache, atau sejenisnya dari web server lain. Namun FastPlaz mencoba mengakomodir semuanya, bisa dari `.htaccess` maupun dengan menggunakan konfigurasi `routing`.

## Format

Format penulisan _route_ di Pascal seperti ini:
```pascal
Route['/permalink'] := TNamaController;
```

Penulisan permalink dilakukan dengan `regex`. 

> Regular Expression, sering ditulis/disebut juga Regex/Regexp, adalah deretan karakter spesial yang mendefinisikan sebuah pola dalam pencarian teks.

## Implementasi

Anggap jika ada url `http://domain/customer` yang akan diolah oleh _controller_ `TCustomerController`, maka kode pascal-nya akan seperti ini:

```pascal
Route['/customer'] := TCustomerController;
```

### Custom Routing

Tentunya kawan-kawan pernah melihat suatu url yang panjang tapi tetap menarik dilihat karena tidak menggunakan variabel di query string, seperti ini:
```
https://www.fastplaz.com/2014/12/wordpress-loader-contoh-aplikasi-fastplaz/
```
Biasa terlihat di situs-situs berita online, blog dan sejenisnya. Routing untuk uri tersebut kurang lebih akan sepert ini:

```pascal
Route['^/([0-9]+)/([0-9]+)/(.*)/$'] := TNewsController; 
```

Demikian juga jika ingin menampilkan profil dari data **kustomer** menjadi `http://localhost/customer/2/profile/`.

```pascal
// http://localhost/customer/2/profile/
Route['^/([0-9]+)/profile/$'] := TProfileModule; 

// handler uri: "/customer/{id}/"
Route['^/([0-9]+)'] := TCustomersModule; Route['/'] := TCustomersModule;
```

### Membaca Data

Lalu bagaimana cara membaca datanya?

Mudah kok, sama seperti membaca query string seperti biasa, tetap menggunakan `_GET`, hanya saja kali ini menggunakan index sesuai urutan parameter regex-nya.

Misal untuk 
```pascal
Route['^/([0-9]+)/profile/$'] := TProfileModule; 
```

Maka untuk membaca nilai id dari kustomer cukup dengan
```pascal
var
  customerID: string;

.
.  
customerID := _GET['$1'];
```

Sedangkan untuk routing link berita seperti contoh diatas
```pascal
Route['^/([0-9]+)/([0-9]+)/(.*)/$'] := TNewsController; 
```
Maka cara membacanya:
```pascal
var
  newsYear, newsMonth, newsTitle: string;

.
.  
newsYear := _GET['$1'];
newsMonth := _GET['$2'];
newsTitle := _GET['$3'];
```