# Product Requirements Document (PRD)
## Aplikasi Web "Birthday Surprise" — Long Distance Romantic Birthday Reveal

**Versi:** 1.0
**Tanggal:** 6 September 2026
**Jenis Produk:** Single-Page Web Application (SPA)
**Tujuan Penggunaan:** Personal / hadiah digital ulang tahun jarak jauh

---

## 1. Ringkasan Eksekutif

Aplikasi web satu halaman yang berfungsi sebagai kejutan ulang tahun digital untuk pasangan yang sedang menjalani hubungan jarak jauh (LDR). Pengalaman dirancang sebagai sebuah *interactive story* dengan 5 fase berurutan — mulai dari verifikasi identitas penerima yang playful, animasi loading yang membangun antisipasi, hingga puncak kejutan berupa dashboard ulang tahun dengan koleksi foto dan pesan romantis.

**Nilai utama produk:** menciptakan momen emosional yang terasa personal, halus (smooth), dan "premium" — bukan sekadar kartu ucapan statis, melainkan pengalaman interaktif yang harus "dilalui" oleh penerima.

---

## 2. Tujuan & Sasaran (Goals)

| Tujuan | Deskripsi |
|---|---|
| Emosional | Membangun antisipasi bertahap sebelum reveal utama (Phase 5) |
| Personalisasi | Mudah diisi ulang dengan foto & pesan pribadi tanpa mengubah struktur kode |
| Kualitas Visual | Transisi mulus, tidak ada "jumpcut" antar fase |
| Aksesibilitas Sederhana | Bisa dibuka via link browser di HP, tanpa install apapun |

### Non-Goals (di luar cakupan v1)
- Tidak perlu backend/database — semua konten (foto, pesan) di-hardcode di source code.
- Tidak perlu autentikasi/login.
- Tidak perlu mendukung banyak pengguna sekaligus (single-recipient experience).
- Tidak perlu CMS untuk mengubah konten.

---

## 3. Target Pengguna

- **Primary user (penerima):** pasangan penerima kejutan, mengakses via link, kemungkinan besar dari perangkat mobile.
- **Secondary user (pembuat/admin):** pembuat aplikasi (Dwg), yang akan mengganti placeholder foto & teks pesan sebelum deploy.

---

## 4. Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React (Vite atau CRA) |
| Styling | Tailwind CSS |
| Animasi | Framer Motion (transisi antar fase, drag/fall animation) + CSS Keyframes murni (flame flicker, confetti loop, heartbeat) |
| Confetti | Library ringan (mis. `canvas-confetti` atau custom CSS particle) |
| State Management | React `useState` / `useReducer` lokal (tidak perlu Redux, aplikasi kecil & linear) |
| Assets | Placeholder images (`/placeholder.jpg`) untuk foto polaroid, mudah diganti manual |
| Deployment target | Static hosting (Vercel/Netlify) |

---

## 5. Arsitektur Alur Pengguna (User Flow)

Aplikasi menggunakan **satu state global** (mis. `phase: 'envelope' | 'confirm' | 'loading' | 'dashboard' | 'surprise'`) yang mengontrol komponen mana yang di-render, dibungkus `AnimatePresence` dari Framer Motion agar transisi antar fase mulus (fade/scale, bukan hard switch).

```
[Phase 1: Envelope] --Iya--> [Phase 2: Confirmation] --Iya--> [Phase 3: Loading (3s)] --auto--> [Phase 4: Dashboard] --tiup lilin--> [Phase 5: Surprise]
       ^                              |
       |______________Tidak__________|
       (kembali ke Phase 1, amplop tertutup)

[Phase 1] --Tidak--> shake/close animation --> reset ke Phase 1
```

---

## 6. Spesifikasi Fungsional per Fase

### Phase 1 — The Envelope
**Tujuan:** Verifikasi playful bahwa yang membuka adalah orang yang benar.

- Background: gradasi lembut/aesthetic (pastel, mis. peach-to-lavender), bisa pakai efek blur blob di belakang.
- Komponen utama: Amplop digital di tengah layar (ilustrasi CSS/SVG atau custom shape dengan Tailwind).
- Teks: **"Apakah benar ini orangnya?"** — muncul dengan fade-in/slide-up saat mount.
- Dua tombol: **"Iya"** dan **"Tidak"**, dengan hover/tap animation (scale saat hover, sedikit bounce saat klik).
- **Behavior klik "Tidak":**
  - Amplop menjalankan animasi shake (translateX kiri-kanan cepat, mis. `keyframes: [-8,8,-6,6,0]`) DAN/ATAU animasi "menutup" (mis. flap amplop turun jika didesain sebagai amplop terbuka).
  - State di-reset (tetap di Phase 1, tidak ada perubahan data).
- **Behavior klik "Iya":** transisi keluar Phase 1 (fade+scale down) → masuk Phase 2.

### Phase 2 — The Confirmation
**Tujuan:** Konfirmasi kedua, membangun rasa penasaran.

- Teks berubah secara transisi halus (crossfade / slide) menjadi: **"Apakah anda yakin?"**
- Tombol "Iya"/"Tidak" tetap ada, posisi & style konsisten dengan Phase 1 (hindari layout shift).
- **Behavior klik "Tidak":** amplop menutup kembali (reverse animation) → kembali ke Phase 1 (bukan reset paksa/reload, cukup transisi state).
- **Behavior klik "Iya":** transisi keluar → masuk Phase 3.

### Phase 3 — Loading Screen
**Tujuan:** Membangun antisipasi sebelum reveal.

- Full-screen overlay (menutupi/mengganti elemen amplop sepenuhnya).
- Visual: heartbeat animation (elemen hati yang "berdetak" via CSS `scale` keyframes berulang) ATAU spinner custom — pilih salah satu, disarankan heartbeat agar konsisten tema romantis.
- Teks: **"Baiklah kalau anda memang benar orang ini..."**
- **Durasi: TEPAT 3 detik**, menggunakan `setTimeout` di dalam `useEffect`, lalu otomatis set phase ke `'dashboard'`. Tidak ada interaksi user yang diperlukan di fase ini (tombol dinonaktifkan/disembunyikan).

### Phase 4 — Birthday Dashboard
**Tujuan:** Menampilkan sentuhan festive utama sebelum klimaks.

- Dashboard penuh (bukan overlay) dengan elemen sentral: **Kue Ulang Tahun digital** (CSS/SVG) dengan **satu lilin menyala**.
- Api lilin: animasi flicker menggunakan CSS `@keyframes` (variasi kecil pada `scaleY`, `opacity`, dan sedikit `skew`/`translateX` agar terlihat seperti api asli, loop infinite dengan `ease-in-out`).
- Confetti latar belakang: looping, gentle (partikel jatuh pelan, opacity rendah, tidak mengganggu fokus ke kue) — berjalan terus-menerus selama Phase 4.
- Interaksi wajib: tombol **"Tiup Lilin"** (atau klik langsung pada elemen lilin/api).
- **Behavior saat lilin "ditiup":**
  - Animasi api padam (scale ke 0 + fade out, sedikit "asap" opsional).
  - Trigger transisi ke Phase 5.

### Phase 5 — The Surprise (Reveal)
**Tujuan:** Klimaks emosional — harus terasa "meledak" secara visual namun tetap elegan.

Tiga elemen berikut **berjalan bersamaan (simultan)** saat lilin padam:

1. **Falling Photos:** Beberapa frame foto bergaya polaroid (`src="/placeholder.jpg"`, mudah diganti nanti) jatuh dari atas layar dengan rotasi acak & delay staggered (Framer Motion `staggerChildren`), lalu "mendarat" membentuk kolase acak (posisi absolute dengan rotasi & offset berbeda-beda) sebagai elemen background/dekoratif.
2. **Big Confetti Burst:** Ledakan confetti besar (lebih padat & lebih cepat dibanding confetti Phase 4), idealnya trigger dari titik tengah bawah layar menyebar ke atas.
3. **Greeting Overlay:** Teks besar elegan **"Selamat Ulang Tahun!"** fade-in di tengah layar (di atas layer foto & confetti, dengan sedikit backdrop blur/overlay gelap tipis agar teks tetap terbaca), disertai area untuk **pesan romantis custom** (paragraf teks, mudah diedit di source code).

---

## 7. Persyaratan Non-Fungsional

| Aspek | Requirement |
|---|---|
| Performa animasi | Target 60fps; gunakan `transform`/`opacity` untuk animasi (hindari animasi properti `top/left/width` yang trigger reflow) |
| Responsif | Layout utama harus tetap baik di viewport mobile (asumsi penerima buka dari HP) |
| Transisi antar-fase | Tidak boleh ada "flash"/jump konten; gunakan `AnimatePresence` + `exit` animation di setiap fase |
| Waktu loading Phase 3 | Harus presisi 3 detik, tidak lebih/kurang, tidak bergantung pada network (bukan fetch, murni timer) |
| Reusability aset | Semua foto & teks pesan personal harus terpisah jelas dalam kode (mis. array `photos[]`, konstanta `MESSAGE`) agar gampang diganti sebelum deploy final |
| Kompatibilitas browser | Chrome & Safari mobile terbaru minimal |

---

## 8. Struktur Komponen (Referensi Teknis, bukan wajib diikuti persis)

```
<App>
 ├─ <PhaseEnvelope />        (Phase 1)
 ├─ <PhaseConfirmation />    (Phase 2)
 ├─ <PhaseLoading />         (Phase 3)
 ├─ <PhaseDashboard />       (Phase 4)
 │    ├─ <CakeWithCandle />
 │    └─ <ConfettiLoopBackground />
 └─ <PhaseSurprise />        (Phase 5)
      ├─ <FallingPolaroids />
      ├─ <ConfettiBurst />
      └─ <GreetingOverlay />
```

State utama disimpan di `<App>`, di-pass sebagai props/callback ke tiap fase (`onConfirm`, `onDecline`, `onCandleBlown`, dst).

---

## 9. Edge Cases & Perilaku Khusus

- Jika user klik "Tidak" berkali-kali di Phase 1/2 → animasi shake/close harus bisa di-retrigger tiap klik (reset animation key), tidak macet di state animasi sebelumnya.
- Jika user resize browser di tengah Phase 5 (foto sudah settle) → posisi kolase foto sebaiknya tetap proporsional (gunakan unit relatif `%` atau `vw/vh`, bukan px absolut).
- Tombol "Tiup Lilin" hanya aktif satu kali — setelah dipadamkan, tidak bisa di-trigger ulang (mencegah replay tak sengaja mengacaukan animasi Phase 5).
- Phase 3 (loading) tidak boleh bisa di-skip oleh user (tidak ada tombol skip/back).

---

## 10. Kriteria Penerimaan (Acceptance Criteria)

- [ ] Klik "Tidak" di Phase 1 memicu animasi shake/close dan tetap di Phase 1.
- [ ] Klik "Iya" di Phase 1 berpindah mulus ke Phase 2 dengan teks baru.
- [ ] Klik "Tidak" di Phase 2 kembali ke Phase 1 dengan animasi amplop menutup.
- [ ] Klik "Iya" di Phase 2 masuk ke Phase 3.
- [ ] Phase 3 berlangsung tepat 3 detik lalu otomatis pindah ke Phase 4 tanpa input user.
- [ ] Di Phase 4, api lilin flicker secara kontinu sampai ditiup.
- [ ] Klik/tap "Tiup Lilin" memadamkan api dan memicu Phase 5.
- [ ] Di Phase 5, foto jatuh & settle, confetti besar meledak, dan teks "Selamat Ulang Tahun!" muncul — ketiganya terlihat berjalan bersamaan.
- [ ] Semua transisi antar fase menggunakan animasi (tidak ada perubahan tampilan yang mendadak/patah).
- [ ] Placeholder foto (`/placeholder.jpg`) dan teks pesan mudah ditemukan & diganti di source code.

---

## 11. Rencana Lanjutan (Nice-to-have, di luar v1)

- Musik latar romantis yang auto-play (dengan tombol mute).
- Custom cursor tema hati/bunga.
- Animasi typing effect pada pesan romantis di Phase 5.
- Opsi share link hasil setelah selesai dibuka.

---

*Dokumen ini menjadi acuan sebelum implementasi kode React + Tailwind + Framer Motion. Setelah PRD disetujui, tahap berikutnya adalah pembuatan komponen satu per satu sesuai struktur di Bagian 8.*
