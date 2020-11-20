---
id: helper
title: Helper
sidebar_label: Helper
---

Disebutkan dalam artikel mengenai _Object Pascal_, bahwa 
> Helpers are a way to extend a class without using inheritance, which is also useful for records that do not allow inheritance at all.

_FastPlaz_ telah menyediakan beberapa _helper_ yang akan memudahkan Anda dalam membuat program dengan Pascal. Dengan menggunakan helper akan membuat kode Anda akan mudah dibaca, bahkan menyerupai bahasa manusia sehari-hari.

| Unit | Deskripsi |
|---|---|
| [string_helper](#string_helper) | Helper terhadap tipe data AnsiString/String |
| [datetime_helper](#datetime_helper) | Helper terhadap tipe data TDateTime |
| [integer_helper](#integer_helper) | Helper terhadap tipe data Integer |
| [array_helper](#array_helper) | Helper terhadap tipe data TStringArray |
| [verbal_expressions_lib](#verbal-expression) | Verbal Expression |

Sebagian fungsi di dalam `helper` ini sudah terakomdir di dalam fpc 3.2.0.

## string_helper

Jika terdapat variabel ini:
```pascal
d : TDateTime;
s : String;
i : integer;
```

Banyak hal yang bisa dilakukan dari helper ini.
```pascal
d := s.AsDateTime; //konversi dari date string ke datetime
i := s.AsInteger; //konversi dari string ke integer

// jika s mengandung kata 'cari'
if s.Has('cari') then begin ... end;

// jika s adalah url/emal
if s.IsEmail then ...
if s.IsURL then ...

s := s.UrlEncode;
s := s.Encode64;
s := s.Decode64;

s := 'saya makan nasi';
s := s.cut('saya','nasi').trim;
// s berisi 'makan'

s.SaveToFile('/path/filename');
```

Sebagian contoh juga terdapat di [dokumen](https://github.com/fastplaz/fastplaz/blob/master/docs/string-helper.md) repositori.

Untuk daftar lebih lengkap bisa dilihat dari file unit [`string_helper`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/string_helpers.pas).

## datetime_helper

Jika terdapat variabel ini:
```pascal
d : TDateTime;
s : String;
```

Banyak hal yang bisa dilakukan dari helper ini.
```pascal
d := d.FromString( '17-08-1945 09:59:00');
s := d.Format( 'yyyy-mm-dd HH:nn:ss');
s := d.AsString;

if d.IsAM then begin ... end;
if d.IsPM then begin ... end;
if d.IsToday then begin ... end;

if Tomorrow.IsSaturday then begin ... end;
if d.HourOf = 9 then ....

d := d.IncMinute(1);

if d.YearsDiff( Now) > 40 then begin ... end;

s := d.HumanReadable;
// 'more than 73 years ago'

// konversi tanggal menjadi unixtime
i := d.AsUnixTime;
```

Sebagian contoh juga terdapat di [dokumen](https://github.com/fastplaz/fastplaz/blob/master/docs/datetime-helper.md) repositori.

Untuk daftar lebih lengkap bisa dilihat dari file unit [`datetime_helper`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/datetime_helpers.pas).

## integer_helper

```pascal
var
  i: integer;

// jika nilai i antara 300 dan 400
if i.InRange( 300, 400) then ...

// konversi dari unixtime ke tdatetime
d := i.AsDateTime;
```

Untuk daftar lebih lengkap bisa dilihat dari file unit [`integer_helper`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/integer_helpers.pas).

## array_helper

```pascal
// cek apakah string 'zero' ada di dalam array
const
  NUMBER_LIST: array[0..5] of string = ('zero', 'one', 'two', 'three', 'four', 'five');
var
  i: integer;
  whereAsArray: TStringArray;

.
.
if 'zero' in NUMBER_LIST then
begin
  //
end;

// menambahkan suatu string ke dalam array of string
whereAsArray.Add('isi string');

// mendapatkan panjang/jumlah item di dalam array
i := whereAsArray.Count;
```

Untuk daftar lebih lengkap bisa dilihat dari file unit [`array_helpers`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/array_helpers.pas).


## Verbal Expression

Verbal Expression ini adalah library FastPlaz yang membantu dalam mengkonstruksi _regular expressions_ yang berat.

```pascal
VE := TVerbalExpressions.Create;
VE.StartOfLine()
  .Has('http')
  .Maybe('s')
  .Has('://')
  .Maybe('www.')
  .AnythingBut(' ')
  .EndOfLine(false);

if VE.IsMatch('https://fastplaz.com') then
begin
  // your code
end;


// expression: ^(http)(s)?(:\/\/)(www\.)?([^ ]*)
```

Kode ini akan menghasilkan regex: `^(http)(s)?(:\/\/)(www\.)?([^ ]*)`.

### Replace String

```
varString := 'Replace bird with a duck';
VE.Find('bird');
varString := VE.Replace(varString, 'duck');
```
or

```
varString := VE.Find('red').Replace('We have a red house', 'blue');
```

### Methods list

Name|Description|Usage
:---|:---|:---
Add| add values to the expression| Add('abc')
startOfLine| mark expression with ^| startOfLine(false)
endoOfLine| mark the expression with $|endOfLine()
has|add a string to the expression| has('foo')
find| alias for has| find('foo')
maybe| define a string that might appear once or not| maybe('.com')
anything| accept any string| anything()
anythingBut| accept any string but the specified char| anythingBut(',')
something| accept any non-empty string| something()
somethingBut| anything non-empty except for these chars| somethingBut('a')
LineBreak| match \r \n|lineBreak()
br|shorthand for lineBreak| br()
tab|match tabs \t |tab()
word|match \w+|word()
anyOf| any of the listed chars| anyOf('abc')
any| shorthand for anyOf| any('abc')
range| adds a range to the expression|range(a,z,0,9)


#### Note

Inspiration from [VerbalExpressions](http://verbalexpressions.github.io/)