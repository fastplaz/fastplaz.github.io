---
id: method
title: Method
sidebar_label: Method
---

There are several methods for transmitting data to a web server, including

| Method | Description | Body |
|---|---|---|
| GET | Retrieve a document from the server | N |
| POST | Retrieve a document's header from the server | N |
| HEAD | Send data to the server for processing | Y |
| PUT | Store the data in the Body on the server | Y |
| TRACE | Trace the message path from the proxy server to the server | N |
| OPTIONS | Find out which methods the server supports | N |
| DELETE | Delete data from the server | N |

FastPlaz splits each method into its own overridden `procedure`, which makes it easier for _engineers_ to build applications.

In the `Type` section, just declare
```pascal
type
  TContactController = class(TMyCustomController)
  private
  public
    .
    .

    procedure Get; override;  // 👈 handles the GET method
    procedure Post; override; // 👈 handles the POST method
  end;
```

And the `implementation` section looks like this
```pascal
// this procedure handles all GET requests
procedure TContactController.Get;
begin
  
  //
  
end;

// this procedure handles all POST requests
procedure TContactController.Post;
begin
  
  //

end;

// likewise for Put, Delete and Options
```
