---
id: global
title: Global Variables
sidebar_label: Global Variables
---

_FastPlaz_ provides several ready-to-use _global variables_ and functions/procedures.

## _GET

**\_GET** is an associative array used to get values from a _query string_.

Given the url `http://yourdomain.tld/?id=2020`, the value of the `id` variable can be read as follows.

```pascal
procedure TSomeController.Get;
var
  id: string;
begin
  id := _GET['id'];

  // your code here

end;
```

The same applies to other query string variables.


## _POST

**\_POST** is an associative array used to get the value of a variable in a request made with the *POST method*.

It works just like `_GET`, except it is used for POST requests, typically when submitting a form, or for an API that uses the POST method.

For example, with the following HTML Form:
```html
<form method="POST" enctype="multipart/form-data">
  Name: <input id="firstName" name="firstName" >
</form>
```

The Pascal code to get that input is as follows:
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

A *Session* is data stored on a server that can be used globally on that server, where the data refers specifically to a particular user/client. A typical use of sessions is when a user has logged in on a certain page.

A session is a mechanism for keeping information across different web pages to identify users as they browse a site or application.

Sessions are read and written through the `_SESSION` variable.

```pascal
// read session
last_login = _SESSION['last_login'];

// write session
_SESSION['variable'] := 'value';
_SESSION['token_expired'] := now.IncHour(24*7).AsString;
_SESSION['token_expired_timestamp'] := now.IncHour(24*7).AsUnixTime();
```

If you need to clear the session contents, for example when a user logs out, call the `clear` procedure.
```pascal
Session.Clear
```

The `Session ID` is available in the `SessionID` variable, and can be used directly:
```pascal
varId := SessionID;
```

## Environment

Useful if you want to read the value of a server `Environment` variable, for example:
- HTTP_USER_AGENT
- HTTP_REFERER
- SERVER_NAME

It is used like reading any other variable.

```pascal
httpUserAgent := Environment['HTTP_USER_AGENT'];
```
You might get a result like this:
`Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:82.0) Gecko/20100101 Firefox/82.0`.

## Header

Gets header information sent by the user, typically used by an API to get an authentication token.
```pascal
token := Header['Token'];
clientSecret := Header['ClientSecret'];
```

On the Apache http server, you need certain settings in the `.htaccess` file to be able to read these headers.
```bash
SetEnvIf Token "(.*)" Token=$1
SetEnvIf ClientSecret "(.*)" ClientSecret=$1
```

## CustomHeader

When you need to send specific header information in an API response, use this function.
```pascal
CustomHeader['refresh_token'] := 'sdc212sa12ce-90382j12';
```

## BaseURL

Gets the application's BaseURL as stored in `config.json`.

## Config

Reads configuration values from the `config.json` file.

For example, if you want to get the database username
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

the Pascal code looks like this
```pascal
userName := Config['database/default/username'];
```

## URI

Gets the current active URI.

## Featured Object

### LogUtil

Essential for debugging. This tool writes debug text to log files in the `public_html/ztemp/logs/*.log` folder.
Unit file dependency: `logutil_lib.pas`.
Usage format:
```pascal
LogUtil.Add('Your message', 'Category(optional)');
```
Example:
```pascal
uses logutil_lib, ...;

.
.

LogUtil.Add('Gagal menyimpan data ke database');
LogUtil.Add('Log baris berikutnya', 'TEST');
```

The *log file will then contain
```bash
2020-11-21 01:34:26 | Gagal menyimpan data ke database
2020-11-21 01:34:26 | TEST: Log baris berikutnya
```

### TJSONUtil

TJSONUtil makes it very easy to manage data in json format.
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
The variable `s` will then contain a string in json format.
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

And if you want to read a json string into an object:
```pascal
json.LoadFromJsonString(varJsonString);
firstName := json['first_name'];
city := json['address/city'];
provincy := json['address/provincy'];
```

---

//TODO: Function List
