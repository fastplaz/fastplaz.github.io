---
id: ai-agent-plane-mcp
title: MCP Tools
sidebar_label: MCP Tools
description: Daftar tool MCP server AI Agent Plane di Lazarus IDE, beserta argumen dan izinnya.
---

[AI Agent Plane](/docs/ai-agent-plane) menjalankan MCP server kecil di dalam Lazarus IDE. Halaman ini merangkum tool yang tersedia. Detail teknis lengkap (dalam Bahasa Inggris) ada di [docs/MCP.md](https://github.com/fastplaz/fastplaz/blob/development/docs/MCP.md).

## Server

| Item | Nilai |
| --- | --- |
| Nama server | `fastplaz` |
| URL | `http://127.0.0.1:<port>/mcp` |
| Port default | `17826`; jika terpakai, port berikutnya sampai `17835` |
| Transport | MCP Streamable HTTP (bentuk paling sederhana): `POST /mcp` dengan satu pesan JSON-RPC, respons JSON, tanpa SSE |
| Versi protokol | `2025-11-25`, `2025-06-18` (default), `2025-03-26`, `2024-11-05` |
| Method | `initialize`, `ping`, `tools/list`, `tools/call`, `resources/list`, `resources/read`, `resources/templates/list` |
| Autentikasi | `Authorization: Bearer <token>`, token acak baru setiap server dimulai |
| Batas | Body request 4 MB; hasil teks dipotong di 32 KB |

Tool dijalankan di _main thread_ IDE. Pemanggilan yang lama, seperti _compile_, menahan request HTTP sampai selesai.

## Tool

Ada **19 tool** dalam tiga kelompok. Path boleh absolut atau relatif terhadap direktori project.

Setiap tool membawa MCP `annotations`: `readOnlyHint`, `destructiveHint` (hanya `clean_and_compile_project`), `idempotentHint`, dan `openWorldHint: false`.

### IDE

| Tool | Fungsi | Izin |
| --- | --- | --- |
| `open_file` | Membuka file di Source Editor, opsional di baris dan kolom tertentu | auto |
| `get_active_editor` | File, posisi kursor, teks terpilih, dan status _modified_ dari editor aktif | auto |
| `list_open_files` | Daftar file yang terbuka dan apakah ada perubahan yang belum disimpan | auto |
| `read_editor` | Isi file seperti di editor (termasuk perubahan yang belum disimpan) dengan nomor baris. Hanya file project dan _search path_ | auto |
| `project_info` | Info project aktif: file `.lpi`, main unit, build mode, target OS/CPU, _search path_, opsi compiler, file output | auto |
| `list_project_units` | File yang menjadi bagian project | auto |
| `compile_project` | _Compile_ project (atau build semua dengan `rebuild`). Menyimpan file editor yang berubah terlebih dahulu | ask once per session |
| `build_project` | Build semua unit, seperti **Run → Build** | ask once per session |
| `clean_and_compile_project` | Seperti **Run → Clean up and Build**: menghapus file hasil _compile_ lalu build semua. File source tidak pernah dihapus | always ask |
| `get_messages` | Pesan compiler terakhir dari jendela Messages, lengkap dengan file, baris, dan kolom | auto |

Argumen bersama: `build_mode` (build mode yang diaktifkan dulu) dan `min_urgency` (`hint`, `note`, `warning`, `error`; default `warning`).

Contoh hasil build:

```json
{"success": true, "duration_ms": 1234,
 "messages": [{"file": "...", "line": 10, "column": 5, "urgency": "error", "text": "..."}]}
```

### Editor, Pencarian, dan Unit

| Tool | Fungsi | Izin |
| --- | --- | --- |
| `edit_text` | Mengganti `old_string` dengan `new_string` di buffer editor sebagai **satu langkah undo** (Ctrl+Z membatalkannya). Gagal jika `old_string` tidak ada, atau muncul lebih dari sekali tanpa `replace_all`. Ditulis ke disk hanya dengan `save` | ask once per session |
| `save_file` | Menyimpan buffer editor sebuah file (unit form ikut menyimpan `.lfm`-nya) | ask once per session |
| `revert_file` | Membuang perubahan yang belum disimpan dan memuat ulang file dari disk | always ask |
| `search_project` | Pencarian teks di file project (termasuk buffer yang belum disimpan), atau di `directory` dengan `mask`. Mengembalikan file, baris, dan isi baris | auto |
| `find_unit` | Untuk error _"Can't find unit X"_: file yang akan dipakai compiler, apakah termasuk project, package yang memuatnya, dan petunjuk perbaikan | auto |

### Generator dan Referensi FastPlaz

Generator menulis unit baru dari template FastPlaz, menambahkannya ke project, lalu membukanya di editor. Di FastPlaz, _module_ adalah controller, jadi permintaan "buat module" dikerjakan dengan generator controller.

| Tool | Fungsi | Izin |
| --- | --- | --- |
| `create_simple_controller` | Controller halaman web (`TMyCustomController` dengan Get/Post, dirender lewat theme). Menyimpan `<permalink>_controller.pas` | ask once per session |
| `create_api_controller` | Controller REST yang menjawab JSON (Get/Post/Options). Menyimpan `<permalink>_controller.pas` | ask once per session |
| `create_model` | Unit `TSimpleModel` untuk tabel database. Menyimpan `<name>_model.pas` | ask once per session |
| `get_fastplaz_reference` | Referensi FastPlaz (sama dengan resource `fastplaz://reference`). Dengan `section`, hanya bagian tertentu (`routes`, `model`, `theme`, ...) | auto |

Argumen generator:

- `name`: nama module atau model dalam kata-kata. `"user group"` menjadi `TUserGroupController` / `TUserGroupModel`.
- `permalink`: route controller, misalnya `user-group`. Default: dari `name`.
- `table`: nama tabel database. Jika `name` dikosongkan, nama model diambil dari tabel (`users` menjadi `TUserModel`).
- `directory`: lokasi unit, harus di dalam direktori project. Default: direktori project.

Aturan generator:

- Tidak ada yang ditimpa. Jika file sudah ada, pemanggilan gagal dan tidak ada yang berubah.
- Controller yang dibuat mendaftarkan route-nya di bagian `initialization`. Jika project memiliki `routes.pas`, pindahkan baris tersebut ke sana. Lihat [Routing](/docs/usage-routing).

## Resource

| URI | Isi |
| --- | --- |
| `fastplaz://reference` | Referensi FastPlaz untuk agent (`text/markdown`): struktur project, controller, route, request dan session, theme dan template tag, `TSimpleModel`, `TJSONUtil`, `config.json`, helper, alur kerja di IDE, dan jebakan umum |

## Contoh Request

```http
POST /mcp HTTP/1.1
Host: 127.0.0.1:17826
Authorization: Bearer <token>
Mcp-Session-Id: <session id dari initialize>
Content-Type: application/json

{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"open_file","arguments":{"path":"main.pas","line":42}}}
```

Dalam pemakaian normal Anda tidak perlu memanggil server ini secara manual: Agent Plane mendaftarkannya ke agent secara otomatis.

## Menambah Tool

Bagi kontributor yang ingin menambah tool baru, langkah-langkahnya ada di bagian _Adding a tool_ pada [docs/MCP.md](https://github.com/fastplaz/fastplaz/blob/development/docs/MCP.md#adding-a-tool). Source MCP server ada di `tools/src/ai_plane/`.
