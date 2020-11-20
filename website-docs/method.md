---
id: method
title: Method
sidebar_label: Method
---

Proses transmisi data ke dalam web server terdapat beberapa method, diantaranya

| Method | Deskripsi | Body |
|---|---|---|
| GET | Mengambil dokumen dari server | T |
| POST | Mengambil header dokumen dari server | T |
| HEAD | Mengirimkan data ke server untuk diproses | Y |
| PUT | Simpan data yang ada di bagian Body ke server | Y |
| TRACE | Ikuti jejak pesan dari proxy server sampai ke server | T |
| OPTIONS | Temukan method apa saja yang dapat dijalankan oleh server | T |
| DELETE | Hapus data dari server | T |

FastPlaz telah membagi masing-masing method dalam turunan `procedure`, sehingga akan memudahkan _engineer_ dalam membuat aplikasi.

Pada bagian `Type` cukup didefinisikan
```pascal
type
  TContactController = class(TMyCustomController)
  private
  public
    .
    .

    procedure Get; override;  // 👈 untuk menangani method GET
    procedure Post; override; // 👈 untuk menangani method POST
  end;
```

Dan bagian `implementation` akan seperti ini
```pascal
// prosedur ini akan menangani semua method GET
procedure TContactController.Get;
begin
  
  //
  
end;

// prosedur ini akan menangani semua method POST
procedure TContactController.Post;
begin
  
  //

end;

// demikian juga untuk Put, Delete serta Options
```