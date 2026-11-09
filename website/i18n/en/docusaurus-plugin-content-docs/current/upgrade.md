---
id: upgrade
title: Upgrading to the 2026 Release
sidebar_label: Upgrading to the 2026 Release
description: Behavior changes in the November 2026 release to check before upgrading.
---

The [2026 "Hero" release](/blog/2026/11/10/release-hero-2026) fixes many bugs found in a full review of `FastPlaz/src` and `tools/src`. Most fixes are invisible to applications, but some of them **can change how an existing application behaves**. Check the list below before upgrading.

## How to Upgrade

```bash
cd fastplaz
git pull
```

Then recompile the packages in Lazarus: `fastplaz_runtime.lpk`, then `fastplaz_tools.lpk` (compile and install). See also [Installation](/docs/installation).

## Summary

| Area | Change |
| --- | --- |
| Redirect / die | Does not leave the method; add `Exit` after it |
| Session | Timeout in minutes; default directory `<TEMP>/sessions` |
| Model | A failed `Save`/`Delete` returns `False` + `Message` |
| Theme | `[flashmessages]` is encoded; use `html=1` for trusted markup |
| Proxy | Enable `systems/trust_proxy` behind a reverse proxy |
| reCAPTCHA | Always the v2 widget |
| Integrations | bmkg, clarifai, googleanalytics, kloudless, newrelic, office365, yandex, zomato marked deprecated |
| Ports | Standalone `17845` (was 8080), Agent Plane MCP `17826` |

## Must Check

### Redirect and die do not stop your code

`Redirect()`, `die()`, and `DieRaise()` send the response and flag the application to stop, but they do **not leave** the current method. Code after the call still runs.

```pascal
// before: the delete still ran for a user without permission
if not isAllowed then
  Redirect(BaseURL + 'login');
Model.Delete(ID);

// now
if not isAllowed then
begin
  Redirect(BaseURL + 'login');
  Exit;
end;
Model.Delete(ID);
```

The framework, the CMS modules, and generated controllers already call `Exit` after every redirect. Check your own controllers for the same pattern.

### Session timeout is in minutes

`systems/session_timeout` and `SessionController.TimeOut` are in **minutes**, as documented. Before, the value was compared against seconds, so the default of 3 days (`4320`) expired after 72 minutes. If you worked around this with a very large value, lower it again.

### Session directory

When `systems/session_dir` is empty, session files are stored in `<TEMP>/sessions` (following the `TEMP` environment variable). `ztemp/sessions` is only used when `TEMP` is not set or not writable. Set `systems/session_dir` if several applications on one host must not share sessions.

### Failed Save and Delete return False

`TSimpleModel.Save`, `Delete`, and `SoftDelete` return `False` and fill `Message` when they fail. Before, a failure ended the request with an error page.

```pascal
if not Model.Save('id=' + Model.QuoteValue(id)) then
begin
  LogUtil.Add(Model.Message, 'model');
  Exit;
end;
```

### Flash messages are encoded

`[flashmessages]` HTML-encodes every message. A message that intentionally contains markup is shown as text. Use `[flashmessages html=1]` for trusted messages only.

### Client IP and proxy headers

`X-Forwarded-For` and `Client-IP` are ignored by default because clients can fake them. If the application is behind a reverse proxy, enable:

```json
"systems" : { "trust_proxy" : true }
```

### reCAPTCHA

The v1 API was shut down by Google. `TReCaptcha` only uses `siteverify`, and `THTMLUtil.ReCaptcha()` always renders the v2 widget, whatever the value of its `Version` argument.

### Deprecated integrations

The following services are discontinued. Their classes still compile but are marked `deprecated` and will be removed: `bmkg`, `clarifai`, `googleanalytics` (Universal Analytics), `kloudlesscalendar`, `newrelic`, `office365`, `yandextranslate`, `zomato`.

## Good to Know

### Database

- `QuoteIdentifier()` and `QuotedTableName` quote table and alias names, so names such as `order` or `my-table` work.
- `QuoteValue()` quotes a value for the active driver. Use it for every value you put into a `Where` string.
- `SoftDelete` now works. With `UseSoftDelete`, `Delete` marks rows through `SoftDeleteField` (default `is_deleted`).
- `ExecScript` / `ExecSQLScript` run multi-statement SQL in a single transaction (rolled back on failure).
- `TSimpleModel.Create('')` derives the table name from the class name: `TUserGroupModel` becomes `user_groups`.

### Theme

- New filter `escape` (aliases `html`, `htmlspecialchars`): `[$name|escape]`.
- `[if]` supports `=`, `==`, `!=`, `<>`, `<`, `>`, `<=`, `>=`, nesting, multi-line HTML, and quoted values.
- `[foreach]` can be nested, and the dataset is rewound before it is rendered.
- Template names from the request are filtered through `TThemeUtil.SafeTemplateName()`.
- Include paths that start with `/` are resolved from the web root, not from the drive root.
- The page cache is stored per session when the session holds data.
- `ThemeUtil.View` has been removed; use `ThemeUtil.Render`.

### Security

- CSRF tokens are created per form, so two forms on one page no longer invalidate each other. Check with `isValidCSRF` in the controller, render with `HTMLUtil.CSRF('formid')`.
- Session cookies are `HttpOnly`, `SameSite=Lax`, and `Secure` when the request came over HTTPS.
- `SessionController.RegenerateID` issues a new session id, for example after login.
- `RandomString()` uses a cryptographically secure random generator (CSPRNG).
- HTTP methods the controller does not handle get `405 Method Not Allowed`.
- `/initialize` refuses to run when `config/config.json` already exists.
- `EnableCors` no longer combines `*` with credentials; pass an explicit origin if you need credentials.

### Library

- `TJSONUtil` accepts an array as the root again.
- `TMailer` supports Cc and Bcc, and can send without Synapse through the built-in SMTP client (`smtp_lib`).
- `TRedisLib` supports IPv6 and applies `TimeOut` when connecting.
- `DateTimeHuman()` parses dates without depending on the locale.

### IDE Tools

- Module, controller, model, and project names are converted to valid Pascal identifiers automatically (`my-app` → `myapp`, `2fa` → `_2fa`).
- Cancelling a wizard no longer creates files.
- _Create Theme Structure_ copies the default theme again.
- Database Explorer uses the configured port and saves the table prefix.

Full technical details: [UPGRADE.md](https://github.com/fastplaz/fastplaz/blob/development/docs/UPGRADE.md) and [CHANGES.md](https://github.com/fastplaz/fastplaz/blob/development/docs/CHANGES.md).
