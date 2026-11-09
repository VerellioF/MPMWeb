# MPM Motor Blitar — Website Resmi & Portal Manajemen Showroom

Portal web resmi dan sistem manajemen dealer untuk **PT Mitra Pinasthika Mulia (MPM Motor) Cabang Blitar** — Dealer Resmi Sepeda Motor Honda & Bengkel Resmi AHASS (00109) di Kota & Kabupaten Blitar, Jawa Timur.

---

## 🚀 Fitur Utama

### 🌐 Web Publik ([`http://localhost:3000`](http://localhost:3000))
1. **Header & Navigasi Responsif**:
   - Logo resmi Astra Honda Motor & PT MPM Distributor.
   - Jam operasional showroom & bengkel terintegrasi status buka hari ini.
   - Drawer navigasi mobile responsif (ramah layar 320px–480px / Android & iOS).
2. **Hero Section Otomotif**:
   - Watermark siluet sayap Honda (*Honda Wing*) dan aksen garis kecepatan (*speed lines*).
   - Efek pencahayaan studio & bayangan kontak lantai showroom (*floor shadow*).
   - Barisan mitra pembiayaan resmi: FIFGROUP (Astra), Adira Finance, OTO Kredit Motor, BCA Multi Finance, dan kepatuhan regulasi Otoritas Jasa Keuangan (OJK).
3. **Katalog Motor Honda Interaktif**:
   - Filter kategori lengkap: *Matic / Skutik*, *Sport & Trail*, *Bebek (Cub)*, dan *Motor Listrik (EV)*.
   - Pilihan varian (misal CBS, ABS, Street, Deluxe) dan palet swatch warna motor dinamis.
   - Spesifikasi teknis mesin (cc), konsumsi bahan bakar (km/L), sistem injeksi PGM-FI, dan transmisi.
   - Tombol langsung untuk simulasi kredit instan dan konsultasi WhatsApp.
4. **Kalkulator Simulasi Kredit Resmi**:
   - Infografis alur 3 langkah pengajuan pembiayaan (*Pilih Unit ➔ Atur DP & Tenor ➔ ACC & Unit Dikirim*).
   - Slider rencana uang muka (DP) mulai 10% hingga 50%.
   - Tenor kredit fleksibel: 12, 24, dan 36 bulan.
   - Pilihan konsultan sales pendamping dan jaminan leasing resmi OJK.
5. **Konsultan Sales Resmi**:
   - Profil tim sales showroom lengkap dengan foto, spesialisasi lini motor, dan indikator status online.
6. **Bengkel Resmi AHASS (Layanan Purna Jual)**:
   - 4 fasilitas unggulan: *Pit Express 15 Menit*, *Hi-DS Diagnostic Tool*, *100% Suku Cadang Asli HGP & AHM Oil*, serta *Servis Kunjung & Darurat*.
   - Informasi fasilitas ruang tunggu VIP ber-AC, Free Wi-Fi, dan kopi gratis.
   - Portal panduan booking servis cepat melalui aplikasi resmi **BromPit** (MPM Honda Jatim) dilengkapi simulasi tiket antrean prioritas.
7. **Promo Voucher & Ulasan Pelanggan**:
   - Desain kupon tiket perforasi dengan potongan samping (*side notch*), garis putus-putus (*tear-off*), dan kode kupon dinamis.
   - Ulasan terverifikasi Google Maps 4.8★ dengan avatar, kecamatan domisili di Blitar, dan bintang emas.
   - Peta interaktif Google Maps lokasi Jl. S. Supriadi No. 79, Sananwetan, Kota Blitar.
8. **Agenda Showroom & Berita Terkini**:
   - Jadwal test ride, event komunitas otomotif, servis jemput bola, dan tips perawatan injeksi.
   - Modal baca artikel lengkap dan pendaftaran event via WhatsApp.
9. **Modal Formulir WhatsApp Interaktif**:
   - Konfirmasi nama, nomor WhatsApp aktif, kecamatan di Blitar, pilihan rencana pembelian (*Cash* / *Kredit*), uang muka, dan tenor.
   - Otomatis menyusun pesan WhatsApp resmi yang rapi ke sales terpilih.

---

### 🔒 Portal Admin Showroom ([`http://localhost:3000/admin`](http://localhost:3000/admin))
- **Keamanan Login PIN**: Autentikasi PIN terenkripsi dengan proteksi sesi.
- **Katalog Motor (CRUD)**: Tambah unit motor baru, kelola varian harga OTR, tambah swatch warna, spesifikasi mesin, dan fitur unggulan.
- **Tim Sales (CRUD)**: Kelola data sales konsultan, nomor WhatsApp, foto avatar, peran, dan toggle status online.
- **Program Promo (CRUD)**: Tambah kupon promo baru, atur diskon DP/tenor, label badge, serta aktifkan/nonaktifkan promo.
- **Agenda & Berita (CRUD)**: Terbitkan event showroom atau artikel tips edukasi, atur tanggal, lokasi, serta status (*Mendatang*, *Berlangsung*, *Selesai*).
- **Profil Dealer**: Sunting alamat, jam buka showroom, jam buka AHASS, rating Google, nomor hotline, dan tautan BromPit.
- **Keamanan & Ubah PIN**: Fasilitas ubah kode PIN admin langsung dari dasbor dengan verifikasi PIN lama.
- **Penyimpanan Data Atomik**: Terhubung langsung ke API internal (`/api/admin/data`) yang secara atomik memperbarui `src/data/siteData.json`.

---

## 🛠️ Teknologi & Arsitektur

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Komponen Ikon**: SVG Native murni tanpa dependensi eksternal
- **Penyimpanan State**: React Context API (`SiteDataContext`, `WhatsAppModalContext`)
- **Penyimpanan Data**: JSON Data Store (`src/data/siteData.json`) dengan REST Endpoint (`/api/admin/data`)

---

## 💻 Panduan Menjalankan Proyek

### 1. Prasyarat
- Node.js versi 18.17 atau yang lebih baru.
- npm atau pnpm.

### 2. Instalasi Dependensi & Konfigurasi Environment
```bash
npm install
cp .env.example .env.local
```
*(Atur `ADMIN_PIN` di file `.env.local` atau pada dashboard environment hosting Anda).*

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka browser pada [`http://localhost:3000`](http://localhost:3000).

### 4. Build & Production Run
```bash
npm run build
npm run start
```

### 5. Akses Portal Admin
- **URL**: [`http://localhost:3000/admin`](http://localhost:3000/admin)
- **Kode PIN**: Ditentukan melalui environment variable `ADMIN_PIN` *(default: `123456`)*.

---

## 📁 Struktur Direktori

```
├── public/                 # Aset statis (Logo Honda, Logo MPM, BromPit, Favicon)
├── src/
│   ├── app/
│   │   ├── admin/          # Dasbor Portal Admin Showroom
│   │   ├── api/admin/data/ # REST API untuk penyimpanan data siteData.json
│   │   ├── globals.css     # Tailwind CSS v4 styling & konfigurasi font
│   │   ├── layout.tsx      # Root Layout dengan ClientProviders
│   │   └── page.tsx        # Halaman Beranda Web Publik
│   ├── components/         # Komponen Modular (Hero, Catalog, Calculator, AHASS, dll)
│   ├── context/            # React Context (SiteDataContext, WhatsAppModalContext)
│   └── data/               # Data katalog motor (motorData.ts, siteData.json)
├── next.config.ts          # Konfigurasi Next.js
├── tsconfig.json           # Konfigurasi TypeScript
└── package.json            # Daftar dependensi & script build
```

---

## 👨‍💻 Pengembang
Dikembangkan dengan standar kualitas tinggi oleh **[Verellio](https://verellio.com/)**.
Hak Cipta © 2026 MPM Motor Blitar. Seluruh hak cipta dilindungi undang-undang.
