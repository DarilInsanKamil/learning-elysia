# Learning Elysia API

Proyek ini adalah backend RESTful API yang dibangun menggunakan framework ElysiaJS yang berjalan di atas runtime Bun. Proyek ini menyediakan layanan pengelolaan musik (Lagu dan Album) serta otentikasi pengguna menggunakan JWT dan PostgreSQL sebagai database.

## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

1. Bun Runtime (v1.x atau terbaru)
2. PostgreSQL Database

## Instalasi dan Konfigurasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di mesin lokal Anda.

### 1. Clone Repository

Salin kode sumber ke direktori lokal Anda.

### 2. Install Dependencies

Jalankan perintah berikut untuk menginstal paket yang diperlukan:

```bash
bun install

```

### 3. Konfigurasi Environment Variables

Buat file `.env` di root direktori proyek dan sesuaikan dengan konfigurasi database PostgreSQL Anda serta JWT Secret. Gunakan variabel berikut:

```env
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=password_anda
PGDATABASE=nama_database_anda
PGPORT=5432
JWT_SECRET=rahasia_jwt_anda

```

### 4. Setup Database

Buat tabel-tabel yang dibutuhkan di database PostgreSQL Anda menggunakan query SQL berikut. Struktur ini diambil berdasarkan kode service yang ada:

```sql
-- Tabel Users
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    fullname TEXT NOT NULL
);

-- Tabel Authentications (Refresh Token)
CREATE TABLE authentications (
    token TEXT NOT NULL
);

-- Tabel Albums
CREATE TABLE albums (
    id VARCHAR(50) PRIMARY KEY,
    name TEXT NOT NULL,
    year INTEGER NOT NULL,
    cover TEXT,
    created_at TEXT,
    updated_at TEXT
);

-- Tabel Songs
CREATE TABLE songs (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    genre TEXT NOT NULL,
    performer TEXT NOT NULL,
    duration INTEGER,
    album_id VARCHAR(50),
    created_at TEXT,
    updated_at TEXT,
    CONSTRAINT fk_album FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE
);

```

## Menjalankan Aplikasi

### Mode Development

Untuk menjalankan server dalam mode watch (restart otomatis saat ada perubahan file):

```bash
bun run dev

```

Server akan berjalan di `http://localhost:3000`.

### Mode Testing

Untuk menjalankan unit testing:

```bash
bun test

```

## Spesifikasi API

Berikut adalah daftar endpoint yang tersedia.

### Authentication (`/auth`)

Modul ini menangani login dan pengelolaan token.

| Method | Endpoint | Deskripsi | Auth Required |
| --- | --- | --- | --- |
| POST | `/auth/sign-in` | Login user untuk mendapatkan Access & Refresh Token | Tidak |
| POST | `/auth/refresh` | Memperbarui Access Token menggunakan Refresh Token | Tidak |
| POST | `/auth/logout` | Logout dan menghapus Refresh Token | Ya |

### Users (`/auth`)

Modul untuk mengambil data pengguna.
*Catatan: Endpoint registrasi saat ini dinonaktifkan di kode sumber.*

| Method | Endpoint | Deskripsi | Auth Required |
| --- | --- | --- | --- |
| GET | `/auth/user/:id` | Mengambil detail profil user berdasarkan ID | Ya |

### Albums (`/albums`)

Manajemen data album musik.

| Method | Endpoint | Deskripsi | Auth Required |
| --- | --- | --- | --- |
| GET | `/albums` | Melihat semua daftar album | Tidak |
| GET | `/albums/:albumId` | Melihat detail album spesifik | Tidak |
| POST | `/albums/create` | Menambahkan album baru | Ya |
| PUT | `/albums/:albumId` | Mengupdate data album | Ya |
| DELETE | `/albums/:albumId` | Menghapus album | Ya |
| PATCH | `/albums/:albumId/cover` | Upload cover album (Max 6MB, Image) | Ya |

### Songs (`/song`)

Manajemen data lagu.

| Method | Endpoint | Deskripsi | Auth Required |
| --- | --- | --- | --- |
| GET | `/song/` | Melihat semua daftar lagu | Tidak |
| GET | `/song/:songId` | Melihat detail lagu spesifik | Tidak |
| POST | `/song/create` | Menambahkan lagu baru | Tidak |
| PATCH | `/song/:songId` | Mengupdate data lagu | Tidak |
| DELETE | `/song/:songId` | Menghapus lagu | Tidak |

## Struktur Folder

* `src/index.ts`: Entry point aplikasi.
* `src/db.ts`: Konfigurasi koneksi database PostgreSQL.
* `src/modules/`: Berisi logika bisnis yang dipisahkan per fitur (User, Auth, Album, Song). Setiap modul memiliki:
* `index.ts`: Definisi routes/controller.
* `service.ts`: Logika bisnis dan query database.
* `model.ts`: Definisi schema validasi (Elysia.t).


* `src/utils/`: Utilitas global seperti Auth Guard dan konfigurasi JWT.
* `src/errors/`: Definisi Custom Error handling.
* `public/`: Direktori untuk file statis (seperti cover album).
