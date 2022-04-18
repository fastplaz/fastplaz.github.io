---
id: orm
title: ORM (Object Relationship Mapping)
sidebar_label: ORM
---

_Object Relationship Mapping_ adalah sebuah teknik yang digunakan dalam pemrograman untuk menggunakan basisdata relasional sebagai penyimpanan data dengan bentuk objek. Teknik ini biasa digunakan dalam bahasa pemrograman berorientasi objek saat harus menggunakan basisdata relasional dalam penyimpanannya.
 
FastPlaz menyediakan *Simple ORM* untuk mengakomodir hal-hal di atas, khususnya untuk penggunaan CRUD sederhana.

Database yang saat ini didukung sesuai dengan yang didukung oleh Free Pascal, yaitu:
- Firebird
- MySQL
- ODBC
- Oracle
- PostgreSQL
- SQLite3

Dan dapat dipilih melalui [konfigurasi](/docs/architecture#konfigurasi) di `config.json`.

## Model

Langkah pertama dalam menghubungkan aplikasi ke database adalah dengan membuat `Model`.

Dimisalkan terdapat tabel dengan nama `contacts`, maka kode sumber model fastplaz akan seperti berikut.

```pascal
 TContactModel = class(TSimpleModel)
 private
 public
   constructor Create(const DefaultTableName: string = '');
 end;

.
.
.

constructor TContactModel.Create(const DefaultTableName: string = '');
begin
  inherited Create( DefaultTableName); // table name = contacts
  //inherited Create('yourtablename'); // if use custom tablename
end;

```

### Nama Tabel Default

Pemodelan di FastPlaz menggunakan _Plural Methods_. Jadi bisa diartikan:

- TContactModel 👉 nama tabelnya:  contacts
- TBuildingModel 👉 nama tabelnya:  buildings
- TWarehouseModel 👉 nama tabelnya:  warehouses

Lalu, kalau `TKaryawanModel` akan merefer ke tabel `karyawans`? Ya, benar. Kok lucu yaa? Jangan khawatir, sudah disediakan fitur untuk melakukan [kustomisasi nama](/docs/orm#penamaan-kustom).

### Primary Key Default

Primary Key default mengikuti 1 huruf pertama nama tabel diikuti dengan string 'id'.

Jadi jika nama modelnya adalah `TContactModel`, maka:
- Nama tabel: contacts
- Primary key: cid


### Penamaan Kustom

Anda bisa mengubah nama default tabel dan `primaryKey` menjadi sesuati kebutuhan Anda.

```pascal
constructor TKaryawanModel.Create(const DefaultTableName: string = '');
begin
  inherited Create( DefaultTableName);
  TableName := 'karyawan'; // definikan nama tabel di sini
  primaryKey := 'id';
end;

```

## CRUD

Seperti umumnya dalam pembuatan aplikasi yang terhubung ke database, pasti akan menyinggung hal tentang *CRUD* _(Create Read Update Delete)_.

### Create

Jika akan membuat data baru, cukup dengan memanggil _procedure_ `New`, kemudian diikuti dengan memasukkan nilai ke dalam field, dengan format:

```pascal
contact['field_name'] := 'value';
```
Sehingga akan menjadi seperti berikut:

```pascal
// create new data

contact := TContactModel.Create();
contact.New;
contact['field_name'] := 'value';
contact['first_name'] := 'Luri';
contact['last_name'] := 'Luri';
contact['address'] := 'Alamat Lengkap Saya';
contact['status_id'] := 0;
if not contact.Save() then
begin
  //
  // terjadi kegagalan dalam menyimpan data
  //
end;
contact.Free;
```

### Read

Pola membaca nilai dari suatu field bisa dilakukan dengan format berikut:
```pascal
variableName := contact['field_name'];
```

Fungsi/metode yang tersedia:
- All, mendapatkan seluruh baris data
- Find(...), mendapatkan data dengan kondisi tertentu
- FindFirst(...), mendapatkan data *pertama* dengan kondisi tertentu.

```pascal
// mendapatkan seluruh baris data
contact := TContactModel.Create();
if contact.All then
begin
  //
  // data ditemukan
  //
end;
```

```pascal
// mencari data dengan field primaryKey = 2
if contact.Find(2) then
begin

  // data ditemukan
  firstName := contact['first_name'];

end;
```

```pascal
// pencarian data dengan pengkodisian
var
  whereAsArray: TStringArray;

.
. 
whereAsArray.Add('first_name="luri"');
if contact.Find(whereAsArray) then
begin
  //
  // data ditemukan
  //
end;
```


```pascal
// pencarian data dengan pengkodisian, order dan limitasi
// order by name
// limit 10 offset 90
var
  fieldList: string;
  whereAsArray: TStringArray;

.
. 
whereAsArray.Add('first_name="luri"');
fieldList := 'cid, name, address, status';
if contact.Find(whereAsArray, 'name', 10, fieldList, 90) then
begin
  //
  // data ditemukan
  //
end;
```


#### Join Table

Join terhadap beberapa tabel lain pun bisa dilakukan dengan mudah. Tambahkan kode berikut sebelum perintah pencariaan.

```pascal
contact.AddJoin('reference_table', 'reference_field', 'join_field', 
  ['field_name1','field_name2 alias_name']);
```

Contoh lengkapnya akan seperti berikut:

```pascal
// condition & join

whereAsArray.Add('first_name="luri”');

contact.AddJoin('locations', 'id', 'contacts.location_id', 
  ['code','name country']);

if contact.Find(whereAsArray) then
begin
  //
  // data ditemukan
  //
end;
```

### Update

Cara update data hampir mirip dengan [Create](/docs/orm#create).
Bisa diawali dengan pencarian data, lalu ubah data seperti contoh kode berikut:

```pascal

// find and update
// mencari data kontak dengan field primary key = 6

if contact.Find(6) then
begin
  s := contact['first_name'];

  contact['first_name'] := 'Budi';// ubah nama menjadi "Budi"
  if contact.Update() then
  begin

    // proses update berhasil

  end;

end;
```

### Delete

```pascal
// delete with index

if contact.Delete(6) then
begin
  //
end;

```

```pascal
// delete with condition
var
  whereAsArray: TStringArray;

.
.

whereAsArray.Add('status_id=1');
if contact.Delete(whereAsArray) then
begin
  //
end;

```

```pascal
// delete with Find function
var
  whereAsArray: TStringArray;

.
.

whereAsArray.Add('status_id=1');
if contact.FindFirst(whereAsArray) then
begin
  // do something

  Delete();
end;

```


## Query Builder

Salah satu hal yang menyenangkan dari Simple ORM di FastPlaz ini adalah tersedianya Query Builder. Di dalam prosesnya Query Builder akan menghasilkan baris SQL (MySQL) untuk kemudian dieksekusi.

```pascal
// query builder

contact := TContactModel.Create();
if contact.Select('first_name')
  .Where('status_id=0')
  .OrderBy('first_name')
  .Limit(10)
  .Open() then
begin

  //

end;
```

Di dalam prosesnya, perintah ini akan menghasilkan _Query SQL_:
```sql
SELECT first_name 
FROM contacts 
WHERE status_id=0 
ORDER BY first_name 
LIMIT 10
```

## Mengolah Data

Di atas telah disampaikan cara nntuk menulis dan membaca _single row data_. Lalu bagaimana jika akan mengolah data yang berisi beberapa record data? Anda bisa gunakan metode perulangan yang sudah tersedia di Pascal, seperti `for...do`, `repeat...until` ataupun `while...do`.

```pascal
for i := 1 to contact.RecordCount do
begin
  firstName := contact['first_name'];

  // your code here

  contact.Next; // menuju ke baris record berikutnya
end;
```
```pascal
repeat
  firstName := contact['first_name'];

  // your code here

  contact.Next; // menuju ke baris record berikutnya
until warehouses.EOF;
```
```pascal
while not contact.EOF do
begin
  firstName := contact['first_name'];

  // your code here

  contact.Next; // menuju ke baris record berikutnya
end;
```

Baris-baris kode di atas akan sangat bermanfaat jika anda akan melakukan pengolahan data di dalam `controller`.

## Menampilkan Data

Pada dasarnya proses [Pengolahan Data](/docs/orm#mengolah-data) tidak selalu diperlukan jika hanya sekedar untuk menampikan data tersebut ke user. Dengan menggunakan [FTE/FastPlaz Template Engine](/docs/fte), hal tersebut cukup dilakukan dengan mendefinisikan variabel data yang akan dikirim ke `view`.

Contoh kasus, jika ada suatu aplikasi yang hendak menampilkan isi tabel `warehouses`, maka yang semestinya dilakukan:

### Membuat kode pascal untuk akses ke model warehouse

```pascal
// kode di warehouse controller
// di prosedur Create telah didefiniskan baris berikut
//   warehouses := TWarehouseModel.Create();  

procedure TWarehouseController.Get;
var
  whereAsArray: TStringArray;
begin
  DataBaseInit(); // inisialisasi koneksi ke database

  warehouses.AddJoin('locations', 'id', 
    'warehouses.location_id', 
    ['code','name country']);
  if not warehouses.Find(whereAsArray) then
  begin
    //
  end;

  // Assign data warehouses ke variable $Warehouses
  //   untuk dipakai di view
  ThemeUtil.AssignVar['$Warehouses'] := @warehouses.Data;

  Tags['maincontent'] := @Tag_MainContent_Handler; //<<-- tag maincontent handler
  ThemeUtil.Assign('$Title', 'DB Model');
  ThemeUtil.Layout := 'master'; // custom layout: master.html
  Response.Content := ThemeUtil.Render();
end;
```

### Kode HTML di view

Dan kode HTML di bagian view cukup seperti berikut:

```html
<table>
    <thead>
        <tr><th>&nbsp;</th><th>Code</th><th>Name</th><th>Country</th></tr>
    </thead>
    <tbody>
        [foreach from=$Warehouses item=aItem type=table]
        <tr><td>[$index].</td><td>[aItem.code]</td><td>[aItem.name]</td><td>[aItem.country]</td></tr>
        [/foreach from=$Warehouses]
    </tbody>
</table>
```

Informasi tentang penggunaan tag `foreach` bisa dipelajari di bagian [FTE](/docs/fte/#foreach)

Dan hasilnya kurang lebih akan seperti ini
![ORM View](/img/fastplaz/orm-result.png)

Contoh ini adalah contoh yang sederhana hanya dengan menggunakan "&lt;table&gt;..&lt;/table&gt;" saja. Untuk penggunaan yang lebih menarik bisa memanfaatkan Ajax dengan menggunakan pustaka JS/CSS yang sudah ada.

Contoh yang lebih komplek bisa dipelajari di kode sumber di repositori [Database-Example](https://github.com/pascal-id/database-with-fastplaz).

Lebih dalam tentang penggunaan _templating_ ini bisa dipelajari di bagian [FastPlaz Templating Engine](/docs/fte).

### Ilustrasi

![ORM View](/img/fastplaz/orm-ilustrasi.png)
