---
id: introduction
title: Ctrl+Alt+Del
sidebar_label: Ctrl+Alt+Del
---

[FastPlaz](https://fastplaz.com) adalah web framework untuk [Free Pascal](https://www.freepascal.org/). Aplikasi Anda di-_compile_ menjadi **satu binary native** yang bisa berjalan di shared hosting murah sebagai CGI, atau sebagai HTTP server sendiri. Development bisa melalui [Lazarus IDE](https://www.lazarus-ide.org/) dengan wizard project dan AI coding agent bawaan, atau langsung dari console/terminal.

Desain struktur direktori dan theme/template dibuat sedemikian rupa agar memudahkan dalam melakukan pengembangan aplikasi.

Bisa diimplementasikan di shared hosting, VPS, container, dan juga di platform serverless; di Windows, Linux, maupun macOS.

## Yang Baru di Rilis 2026

- **[Standalone HTTP & CGI](/docs/standalone)**: satu binary bisa berjalan sebagai HTTP server sendiri atau sebagai CGI, tanpa mengubah kode.
- **[AI Agent Plane](/docs/ai-agent-plane)**: coding agent (Claude Code, OpenCode, Pi, GitHub Copilot CLI) di dalam Lazarus IDE, lengkap dengan MCP server yang bisa membuka file, mengedit, _compile_, dan membuat controller/model FastPlaz.
- **Lebih aman dan teruji**: review menyeluruh, perbaikan keamanan, dan lebih dari 700 unit test FPCUnit di Windows dan Linux.

Upgrade dari versi lama? Baca [Upgrade ke Rilis 2026](/docs/upgrade) terlebih dahulu.

## Kemampuan

Sebagian fasilitas yang saat ini ada di FastPlaz:

- Application Wizard (Simple, API, Full Package) dengan pilihan run mode HTTP/CGI
- [Standalone HTTP server & CGI](/docs/standalone) dalam satu binary
- [HTML Templating Engine](/docs/fte)
- [Simple URL Routing](/docs/usage-routing)
- Simple Method Handling
- [Simple ORM (Object Relationship Mapping)](/docs/orm) dengan query builder
- [Session Controller](/docs/global#_session)
- Multi Database Driver: MySQL, PostgreSQL, SQLite, Firebird
- Multi Database Connection (Master/Slave)
- Siap untuk API: controller JSON, CORS, session, token CSRF, reCAPTCHA, mailer dengan SMTP client bawaan, Redis
- Integrasi siap pakai: OpenAI, Telegram, LINE, Facebook Messenger, Slack, Firebase, Elasticsearch, dan lainnya
- Helper NLP bahasa Indonesia (stemmer, kamus)
- [Helper](/docs/helper) & Additional security ([recaptcha & csrf](/docs/fte#featured-tag))
- Tool di IDE: [Database Explorer](/docs/db-explorer), [JSON Validator](/docs/json-validator), [Regex Tester](/docs/regex-tester), Fast Code Suggestion, dan [AI Agent Plane](/docs/ai-agent-plane)
- Distribusi ke shared hosting (cPanel), VPS, container, atau serverless.
