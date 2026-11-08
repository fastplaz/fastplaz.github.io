---
id: usage-routing
title: Routing
sidebar_label: Routing
---

**_Routing_** is a way to map URLs to a _controller_ _action_. By defining a `route`, you can separate how the application is implemented from how its URLs are structured (permalink/slug).

Routing can also be done with Apache's `.htaccess` file, or the equivalent in other web servers. FastPlaz tries to accommodate both: routing can be done via `.htaccess` or with the `routing` configuration.

## Format

A _route_ is written in Pascal like this:
```pascal
Route['/permalink'] := TNamaController;
```

The permalink is written as a `regex`. 

> A Regular Expression, often written/called Regex/Regexp, is a sequence of special characters that defines a pattern for searching text.

## Implementation

Suppose the url `http://domain/customer` is to be handled by the _controller_ `TCustomerController`; the Pascal code looks like this:

```pascal
Route['/customer'] := TCustomerController;
```

### Custom Routing

You have probably seen long urls that still look clean because they don't use query string variables, like this:
```
https://www.fastplaz.com/2014/12/wordpress-loader-contoh-aplikasi-fastplaz/
```
These are common on online news sites, blogs and the like. The routing for such a uri looks roughly like this:

```pascal
Route['^/([0-9]+)/([0-9]+)/(.*)/$'] := TNewsController; 
```

Likewise, to show a **customer** profile as `http://localhost/customer/2/profile/`.

```pascal
// http://localhost/customer/2/profile/
Route['^/([0-9]+)/profile/$'] := TProfileModule; 

// handler uri: "/customer/{id}/"
Route['^/([0-9]+)'] := TCustomersModule; Route['/'] := TCustomersModule;
```

### Reading Data

So how do you read the data?

It's easy: just like reading a regular query string, you still use `_GET`, except this time with an index matching the order of the regex parameters.

For example, for
```pascal
Route['^/([0-9]+)/profile/$'] := TProfileModule; 
```

reading the customer id is as simple as
```pascal
var
  customerID: string;

.
.  
customerID := _GET['$1'];
```

And for the news link routing in the example above
```pascal
Route['^/([0-9]+)/([0-9]+)/(.*)/$'] := TNewsController; 
```
it is read like this:
```pascal
var
  newsYear, newsMonth, newsTitle: string;

.
.  
newsYear := _GET['$1'];
newsMonth := _GET['$2'];
newsTitle := _GET['$3'];
```

### Group Routing

The routing and data reading approach above is the simplest, but it can make reading variables awkward because you have to remember the index order.

Reading a url like this
```
https://www.fastplaz.com/2014/12/wordpress-loader-contoh-aplikasi-fastplaz/
```
would certainly be easier if you could read `year`, `month` and `title` directly as variables.

The _routing_ pattern in the [FastPlaz](https://fastplaz.com) platform allows this using _named group regex_. The regex format is ```(?P<name>regex)```. The routing for the URL above then becomes:
```pascal
Route['^/(?P<year>[0-9]+)/(?P<month>[0-9]+)/(?P<title>.*)/$'] := TNewsController; 
```
And the Pascal code to read those variables becomes:
```pascal
var
  year, month, title: string;

.
.  
year := _GET['year'];
month := _GET['month'];
title := _GET['title'];
```
The routing is a bit longer to write, but it makes development easier.


**FastPlaz, Lightweight and Hassle-Free**
