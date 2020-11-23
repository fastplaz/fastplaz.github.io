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

## Implementasi

Anggap jika ada url `http://domain/customer` yang akan diolah oleh _controller_ `TCustomerController`, maka kode pascal-nya akan seperti ini:

```pascal
Route['/customer'] := TCustomerController;
```

//TODO: routing tutorial
 