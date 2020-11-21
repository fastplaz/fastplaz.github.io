---
id: usage-model
title: Model
sidebar_label: Model
---

## Penamaan

Sebelum membaca halaman ini pastikan sudah mempelajari [kesepakatan penamaan model](/docs/orm#nama-tabel-default) di FastPlaz.

```note
tabel      : employees
file model : employee_model.pas
```

## Membuat Model

Membuat controller bisa dilakukan melalui 2 cara:
1. Dari menu `File|New ...|Database Model Generator`
2. Dari menu `FastPlaz|Database Model Generator`

Dari dialog ini
![Menu Controller](/img/fastplaz/wizard-model-new.png)
Tuliskan nama model yang akan dibuat. Perhatikan kesepakatan penamaan model dan hubungan dengan primary key-nya.

Dan kemudian akan terbentuk file `employee_model.pas` yang kurang lebih akan seperti ini.

```pascal
unit employee_model;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, fpjson, database_lib, string_helpers, dateutils,
  datetime_helpers, array_helpers;

type

{ TEmployeeModel }

  TEmployeeModel = class(TSimpleModel)
  private
  public
    constructor Create(const DefaultTableName: string = '');
  end;

implementation


uses common;

constructor TEmployeeModel.Create(const DefaultTableName: string = '');
begin
  inherited Create( DefaultTableName); // table name = employees
  //inherited Create('yourtablename'); // if use custom tablename
end;

end.
```

Jika anda memiliki nama table dan primary key yang berbeda, pendefinisiannya mengikuti cara di [kesepakatan kustom ORM](/docs/orm#penamaan-kustom).

```pascal
constructor TEmployeeModel.Create(const DefaultTableName: string = '');
begin
  inherited Create( DefaultTableName);
  TableName := 'karyawan'; // definikan nama tabel di sini
  primaryKey := 'id';
end;

```
