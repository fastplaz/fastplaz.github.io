---
id: ai-agent-plane-mcp
title: MCP Tools
sidebar_label: MCP Tools
description: The tools of the AI Agent Plane MCP server in the Lazarus IDE, with their arguments and permissions.
---

[AI Agent Plane](/docs/ai-agent-plane) runs a small MCP server inside the Lazarus IDE. This page summarizes the available tools. Full technical details are in [docs/MCP.md](https://github.com/fastplaz/fastplaz/blob/development/docs/MCP.md).

## Server

| Item | Value |
| --- | --- |
| Server name | `fastplaz` |
| URL | `http://127.0.0.1:<port>/mcp` |
| Default port | `17826`; when it is taken, the next port up to `17835` |
| Transport | MCP Streamable HTTP (simplest form): `POST /mcp` with one JSON-RPC message, JSON response, no SSE |
| Protocol versions | `2025-11-25`, `2025-06-18` (default), `2025-03-26`, `2024-11-05` |
| Methods | `initialize`, `ping`, `tools/list`, `tools/call`, `resources/list`, `resources/read`, `resources/templates/list` |
| Authentication | `Authorization: Bearer <token>`, a new random token each time the server starts |
| Limits | Request body 4 MB; text results are cut at 32 KB |

Tools run in the IDE main thread. A long call, such as a compile, keeps the HTTP request open until it finishes.

## Tools

There are **19 tools** in three groups. Paths can be absolute or relative to the project directory.

Every tool carries MCP `annotations`: `readOnlyHint`, `destructiveHint` (only `clean_and_compile_project`), `idempotentHint`, and `openWorldHint: false`.

### IDE

| Tool | Purpose | Permission |
| --- | --- | --- |
| `open_file` | Opens a file in the Source Editor, optionally at a given line and column | auto |
| `get_active_editor` | File, cursor position, selected text, and modified state of the active editor | auto |
| `list_open_files` | Open files and whether they have unsaved changes | auto |
| `read_editor` | File content as in the editor (including unsaved changes) with line numbers. Project files and search paths only | auto |
| `project_info` | Active project info: `.lpi` file, main unit, build mode, target OS/CPU, search paths, compiler options, output file | auto |
| `list_project_units` | Files that are part of the project | auto |
| `compile_project` | Compiles the project (or builds everything with `rebuild`). Saves changed editor files first | ask once per session |
| `build_project` | Builds all units, like **Run → Build** | ask once per session |
| `clean_and_compile_project` | Like **Run → Clean up and Build**: deletes compiled files, then builds everything. Source files are never deleted | always ask |
| `get_messages` | The last compiler messages from the Messages window, with file, line, and column | auto |

Shared arguments: `build_mode` (build mode to activate first) and `min_urgency` (`hint`, `note`, `warning`, `error`; default `warning`).

Example build result:

```json
{"success": true, "duration_ms": 1234,
 "messages": [{"file": "...", "line": 10, "column": 5, "urgency": "error", "text": "..."}]}
```

### Editor, Search, and Units

| Tool | Purpose | Permission |
| --- | --- | --- |
| `edit_text` | Replaces `old_string` with `new_string` in the editor buffer as **a single undo step** (Ctrl+Z undoes it). Fails if `old_string` is not found, or occurs more than once without `replace_all`. Written to disk only with `save` | ask once per session |
| `save_file` | Saves a file's editor buffer (a form unit also saves its `.lfm`) | ask once per session |
| `revert_file` | Discards unsaved changes and reloads the file from disk | always ask |
| `search_project` | Text search in project files (including unsaved buffers), or in `directory` with `mask`. Returns file, line, and line text | auto |
| `find_unit` | For _"Can't find unit X"_ errors: the file the compiler would use, whether it is part of the project, the package that provides it, and hints for a fix | auto |

### FastPlaz Generators and Reference

Generators write a new unit from a FastPlaz template, add it to the project, and open it in the editor. In FastPlaz a module is a controller, so a "create a module" request is handled with a controller generator.

| Tool | Purpose | Permission |
| --- | --- | --- |
| `create_simple_controller` | Web page controller (`TMyCustomController` with Get/Post, rendered through the theme). Saves `<permalink>_controller.pas` | ask once per session |
| `create_api_controller` | REST controller that answers JSON (Get/Post/Options). Saves `<permalink>_controller.pas` | ask once per session |
| `create_model` | `TSimpleModel` unit for a database table. Saves `<name>_model.pas` | ask once per session |
| `get_fastplaz_reference` | FastPlaz reference (same as the resource `fastplaz://reference`). With `section`, only one part (`routes`, `model`, `theme`, ...) | auto |

Generator arguments:

- `name`: module or model name in words. `"user group"` becomes `TUserGroupController` / `TUserGroupModel`.
- `permalink`: controller route, for example `user-group`. Default: from `name`.
- `table`: database table name. If `name` is empty, the model name is taken from the table (`users` becomes `TUserModel`).
- `directory`: where the unit goes; must be inside the project directory. Default: the project directory.

Generator rules:

- Nothing is overwritten. If the file already exists, the call fails and nothing changes.
- A generated controller registers its route in the `initialization` section. If the project has a `routes.pas`, move that line there. See [Routing](/docs/usage-routing).

## Resources

| URI | Content |
| --- | --- |
| `fastplaz://reference` | FastPlaz reference for agents (`text/markdown`): project layout, controllers, routes, request and session, themes and template tags, `TSimpleModel`, `TJSONUtil`, `config.json`, helpers, workflow in the IDE, and common pitfalls |

## Example Request

```http
POST /mcp HTTP/1.1
Host: 127.0.0.1:17826
Authorization: Bearer <token>
Mcp-Session-Id: <session id from initialize>
Content-Type: application/json

{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"open_file","arguments":{"path":"main.pas","line":42}}}
```

In normal use you do not need to call this server by hand: Agent Plane registers it with the agent automatically.

## Adding a Tool

For contributors who want to add a new tool, the steps are in the _Adding a tool_ section of [docs/MCP.md](https://github.com/fastplaz/fastplaz/blob/development/docs/MCP.md#adding-a-tool). The MCP server source is in `tools/src/ai_plane/`.
