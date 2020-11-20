---
id: global
title: Variabel Global
sidebar_label: Variabel Global
---

_FastPlaz_ telah menyediakan beberapa _variabel global_ dan fungsi/procedur yang siap digunakan.

## _GET

**\_GET** adalah assosiative array yang berguna untuk mendapatkan nilai dari suatu _query string_.

Jika terdapat url `http://yourdomain.tld/?id=2020`, maka untuk mendapatkan nilai dari variable `id` bisa dilakukan dengan cara berikut ini.

```pascal
procedure TSomeController.Get;
var
  id: string;
begin
  id := _GET['id'];

  // your code here

end;
```

Demikian juga halnya untuk variable query string lainnya,.


## _POST

**\_POST** adalah assosiative array yang berguna untuk mendapatkan nilai dari suatu variable pada proses dengan *method POST*.

Sama seperti halnya `_GET`, hanya saja hal ini digunakan ketika terjadi method post, biasanya untuk pengisian suatu form, atau API yang menggunakan method post.

Misal dengan Form HTML berikut:
```html
<form method="POST" enctype="multipart/form-data">
  Name: <input id="firstName" name="firstName" >
</form>
```

Maka kode Pascal untuk mendapatkan masukan tersebut adalah seperti berikut:
```pascal
procedure TSomeController.Post;
var
  firstName: string;
begin
  firstName := _POST['firstName'];

  // your code here

end;
```

## _SESSION

*Session* merupakan data yang disimpan dalam suatu server yang dapat digunakan secara global di server tersebut, dimana data tersebut spesifik merujuk ke user/client tertentu, contoh penggunaan session adalah ketika user telah login di halaman tertentu.

Session adalah mekanisme untuk mempertahankan informasi di semua halaman web yang berbeda untuk mengidentifikasi pengguna saat mereka menelusuri situs atau aplikasi.

Cara membaca dan menulis session bisa dilakukan melalui variabel `_SESSION`.

```pascal
// membaca session
last_login = _SESSION['last_login'];

// menulis session
_SESSION['variable'] := 'value';
_SESSION['token_expired'] := now.IncHour(24*7).AsString;
_SESSION['token_expired_timestamp'] := now.IncHour(24*7).AsUnixTime();
```

Jika suatu kali anda perlu untuk menghapus isi session, misal pada saat user logout, bisa dilakukan dengan memanggil prosedur `clear`.
```pascal
Session.Clear
```

Sedangkan untuk mendapatnya `Session ID` tersedia di variabel `SessionID`, bisa langsung dengan:
```pascal
varId := SessionID;
```

## Environment

Bermanfaat jika anda ingin membaca nilai dari suatu `Environment` server, misal:
- HTTP_USER_AGENT
- HTTP_REFERER
- SERVER_NAME

Cara penggunaanya seperti membaca variabel lain seperti biasa.

```pascal
httpUserAgent := Environment['HTTP_USER_AGENT'];
```
Kemungkinan akan mendapatkan hasil seperti ini:
`Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:82.0) Gecko/20100101 Firefox/82.0`.

## Header

Mendapatkan informasi header yang dikirimkan oleh user, biasanya digunakan oleh suatu API untuk mendapatkan token autentikasi.
```pascal
token := Header['Token'];
clientSecret := Header['ClientSecret'];
```

Di http server Apache, Anda perlu melakukan seting tertentu di file `.htaccess` agar bisa membaca header ini.
```bash
SetEnvIf Token "(.*)" Token=$1
SetEnvIf ClientSecret "(.*)" ClientSecret=$1
```

## CustomHeader

Suatu kali Anda memerlukan untuk mengirim informasi header tertentu ke suatu keluaran API, maka fungsi ini bisa digunakan.
```pascal
CustomHeader['refresh_token'] := 'sdc212sa12ce-90382j12';
```

## BaseURL

Mendapatkan BaseURL dari suatu aplikasi seperti yang tersimpan di `config.json`.

## Config

Membaca nilai konfigurasi yang terletak di file `config.json`.

Misal jika anda ingin mendapatkan username database 
```json
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
      "library" : ""
    }
  },
```

Maka kode pascal-nya akan seperti ini
```pascal
userName := Config['database/default/username'];
```

## URI

Mendapatkan URI aktif saat ini.

## Featured Object

### LogUtil

Sangat perlu untuk debuging. Tools ini menyimpan text debug ke dalam file log di folder `public_html/ztemp/logs/*.log`.
Dependensi file unit: `logutil_lib.pas`.
Format penggunaan:
```pascal
LogUtil.Add('Message Anda', 'Kategori(optional)');
```
Contoh penggunaan:
```pascal
uses logutil_lib, ...;

.
.

LogUtil.Add('Gagal menyimpan data ke database');
LogUtil.Add('Log baris berikutnya', 'TEST');
```

Maka  di dalam file *log akan muncul
```bash
2020-11-21 01:34:26 | Gagal menyimpan data ke database
2020-11-21 01:34:26 | TEST: Log baris berikutnya
```

### TJSONUtil

TJSONUtil ini sangat memudahkan dalam mengelola data dengan format json.
```pascal
var
  s: string;
  json: TJSONUtil;

.
.  
json := TJSONUtil.Create;
json['code'] := Int64(0);
json['email'] := email;
json['first_name'] := 'Luri';
json['last_name'] := 'Darmawan';
json['address/city'] := 'Semarang';
json['address/provincy'] := 'Jawa Tengah';

s := json.AsJson;
```
Akan isi variabel `s` akan berisi string dalam format json.
```json
{
  "code" : 0,
  "email" : "email@email.com",
  "first_name" : "Luri",
  "last_name" : "Darmawan",
  "address" : {
    "city" : "Semarang",
    "provincy" : "Jawa Tengah"
  }
}
```

Sedangkan jika Anda ini membaca suatu string json menjadi object, maka
```pascal
json.LoadFromJsonString(varJsonString);
firstName := json['first_name'];
city := json['address/city'];
provincy := json['address/provincy'];
```

---

//TODO: Function List