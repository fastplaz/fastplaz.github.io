---
id: helper
title: Helper
sidebar_label: Helper
---

As stated in an article about _Object Pascal_,
> Helpers are a way to extend a class without using inheritance, which is also useful for records that do not allow inheritance at all.

_FastPlaz_ provides several _helpers_ that make writing Pascal programs easier. Using helpers makes your code easy to read, even close to everyday human language.

| Unit | Description |
|---|---|
| [string_helper](#string_helper) | Helper for the AnsiString/String data type |
| [datetime_helper](#datetime_helper) | Helper for the TDateTime data type |
| [integer_helper](#integer_helper) | Helper for the Integer data type |
| [array_helper](#array_helper) | Helper for the TStringArray data type |
| [verbal_expressions_lib](#verbal-expression) | Verbal Expression |

Some of the functions in these `helpers` are already covered by fpc 3.2.0.

## string_helper

Given these variables:
```pascal
d : TDateTime;
s : String;
i : integer;
```

This helper can do many things.
```pascal
d := s.AsDateTime; //convert date string to datetime
i := s.AsInteger; //convert string to integer

// if s contains the word 'cari'
if s.Has('cari') then begin ... end;

// if s is a url/email
if s.IsEmail then ...
if s.IsURL then ...

s := s.UrlEncode;
s := s.Encode64;
s := s.Decode64;

s := 'saya makan nasi';
s := s.cut('saya','nasi').trim;
// s contains 'makan'

s.SaveToFile('/path/filename');
```

More examples are in the repository [documentation](https://github.com/fastplaz/fastplaz/blob/master/docs/string-helper.md).

For the full list, see the unit file [`string_helper`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/string_helpers.pas).

## datetime_helper

Given these variables:
```pascal
d : TDateTime;
s : String;
```

This helper can do many things.
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

// convert date to unixtime
i := d.AsUnixTime;
```

More examples are in the repository [documentation](https://github.com/fastplaz/fastplaz/blob/master/docs/datetime-helper.md).

For the full list, see the unit file [`datetime_helper`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/datetime_helpers.pas).

## integer_helper

```pascal
var
  i: integer;

// if i is between 300 and 400
if i.InRange( 300, 400) then ...

// convert unixtime to tdatetime
d := i.AsDateTime;
```

For the full list, see the unit file [`integer_helper`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/integer_helpers.pas).

## array_helper

```pascal
// check whether the string 'zero' is in the array
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

// add a string to an array of string
whereAsArray.Add('isi string');

// get the length/number of items in the array
i := whereAsArray.Count;
```

For the full list, see the unit file [`array_helpers`](https://github.com/fastplaz/fastplaz/blob/master/FastPlaz/src/helper/array_helpers.pas).


## Verbal Expression

Verbal Expression is a FastPlaz library that helps construct difficult _regular expressions_.

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

This code produces the regex: `^(http)(s)?(:\/\/)(www\.)?([^ ]*)`.

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
