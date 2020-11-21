---
id: usage-controller
title: Controller
sidebar_label: Controller
---

## Penamaan

Sebelum membaca halaman ini pastikan sudah mempelajari [kesepakatan penamaan controller](/docs/usage#penamaan) di FastPlaz.

```note
url: http://localhost/employee
tabel: employees
file controller : employee_controller.pas
file model      : employee_model.pas
```

## Membuat Controller

Membuat controller bisa dilakukan melalui 2 cara:
1. Dari menu `File|New ...|Create Simple Controller`
2. Dari menu `FastPlaz|Create Simple Controller`

Dari dialog ini
![Menu Controller](/img/fastplaz/wizard-controller-new.png)
Tuliskan nama fungsi controllernya. Nama controller akan sesuai dengan permalink/url yang nantinya akan digunakan.

Dan kemudian akan terbentuk file `employee_controller.pas` yang kurang lebih akan seperti ini.

```pascal
unit employee_controller;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, html_lib, fpcgi, fpjson, json_lib, HTTPDefs, 
    fastplaz_handler, database_lib, string_helpers, dateutils, datetime_helpers;

type
  TEmployeeController = class(TMyCustomController)
  private
    function Tag_MainContent_Handler(const TagName: string; Params: TStringList
      ): string;
    procedure BeforeRequestHandler(Sender: TObject; ARequest: TRequest);
  public
    constructor CreateNew(AOwner: TComponent; CreateMode: integer); override;
    destructor Destroy; override;

    procedure Get; override;
    procedure Post; override;
  end;

implementation

uses theme_controller, common;

constructor TEmployeeController.CreateNew(AOwner: TComponent; 
  CreateMode: integer);
begin
  inherited CreateNew(AOwner, CreateMode);
  BeforeRequest := @BeforeRequestHandler;
end;

destructor TEmployeeController.Destroy;
begin
  inherited Destroy;
end;

// Init First
procedure TEmployeeController.BeforeRequestHandler(Sender: TObject; 
  ARequest: TRequest);
begin
end;

// GET Method Handler
procedure TEmployeeController.Get;
begin
  Tags['maincontent'] := @Tag_MainContent_Handler; //<<-- tag maincontent handler
  Response.Content := ThemeUtil.Render();
end;

// POST Method Handler
procedure TEmployeeController.Post;
begin
  Response.Content := 'This is POST Method';
end;

function TEmployeeController.Tag_MainContent_Handler(const TagName: string; 
  Params: TStringList): string;
begin

  // your code here
  Result:=h3('Hello "Employee" Module ... FastPlaz !');

end;



initialization
  // -> http://yourdomainname/employee
  // The following line should be moved to a file "routes.pas"
  Route[ 'employee'] := TEmployeeController;

end.
```

Di `unit` ini sudah disedikan proses untuk menangani method http GET dan POST.

Bagian `initialization` route bisa anda pindah ke file `routes.pas`.
