---
id: introduction
title: Ctrl+Alt+Del
sidebar_label: Ctrl+Alt+Del
---

[FastPlaz](https://fastplaz.com) is a web framework for [Free Pascal](https://www.freepascal.org/). Your application is _compiled_ into **a single native binary** that can run on cheap shared hosting as CGI, or as its own HTTP server. Development can be done in [Lazarus IDE](https://www.lazarus-ide.org/), with project wizards and a built-in AI coding agent, or directly from the console/terminal.

The directory structure and theme/template design are laid out to make application development easier.

It can be deployed on shared hosting, VPS, containers, and serverless platforms; on Windows, Linux, and macOS.

## What's New in the 2026 Release

- **[Standalone HTTP & CGI](/docs/standalone)**: a single binary can run as its own HTTP server or as CGI, without code changes.
- **[AI Agent Plane](/docs/ai-agent-plane)**: coding agents (Claude Code, OpenCode, Pi, GitHub Copilot CLI) inside Lazarus IDE, complete with an MCP server that can open files, edit, _compile_, and create FastPlaz controllers/models.
- **Safer and better tested**: a thorough review, security fixes, and more than 700 FPCUnit unit tests on Windows and Linux.

Upgrading from an older version? Read [Upgrading to the 2026 Release](/docs/upgrade) first.

## Features

Some of the features currently available in FastPlaz:

- Application Wizard (Simple, API, Full Package) with HTTP/CGI run mode options
- [Standalone HTTP server & CGI](/docs/standalone) in a single binary
- [HTML Templating Engine](/docs/fte)
- [Simple URL Routing](/docs/usage-routing)
- Simple Method Handling
- [Simple ORM (Object Relationship Mapping)](/docs/orm) with query builder
- [Session Controller](/docs/global#_session)
- Multi Database Driver: MySQL, PostgreSQL, SQLite, Firebird
- Multi Database Connection (Master/Slave)
- API-ready: JSON controllers, CORS, session, CSRF token, reCAPTCHA, mailer with built-in SMTP client, Redis
- Ready-to-use integrations: OpenAI, Telegram, LINE, Facebook Messenger, Slack, Firebase, Elasticsearch, and more
- Indonesian-language NLP helpers (stemmer, dictionary)
- [Helper](/docs/helper) & Additional security ([recaptcha & csrf](/docs/fte#featured-tag))
- IDE tools: [Database Explorer](/docs/db-explorer), [JSON Validator](/docs/json-validator), [Regex Tester](/docs/regex-tester), Fast Code Suggestion, and [AI Agent Plane](/docs/ai-agent-plane)
- Deployment to shared hosting (cPanel), VPS, containers, or serverless.
