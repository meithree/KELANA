# Jelajah Jogja — Admin Dashboard Prototype

Prototype frontend admin menggunakan HTML, CSS, dan JavaScript murni.

## Menjalankan
1. Ekstrak ZIP.
2. Buka folder `e-travel-admin`.
3. Buka `index.html` di browser, atau jalankan Live Server dari VS Code.

## Fitur demo
- Dashboard ringkasan dan grafik ilustratif.
- Navigasi sidebar responsif.
- CRUD destinasi (tambah/edit, arsipkan dengan mengubah status ke Draft).
- Penawaran tiket: harga weekday/weekend, kuota harian, periode, publikasi.
- Promo dan artikel: tambah/edit/hapus.
- Pesanan: pencarian, filter, detail, ubah status pembayaran/pesanan.
- Pengguna: pencarian dan aktif/nonaktif.
- Pengaturan bisnis, transportasi, pembayaran, dan notifikasi.
- Ekspor data pesanan dan pengguna ke CSV.
- Data demo tersimpan di localStorage browser.

## Catatan penting
Ini adalah **prototype frontend**, bukan aplikasi produksi. Data masih disimpan di localStorage dan seluruh angka awal merupakan data ilustrasi. Belum ada autentikasi aman, backend GoFiber, PostgreSQL, payment gateway, upload gambar, atau sinkronisasi realtime. Untuk produksi, semua validasi kuota dan transaksi wajib dilakukan di backend/database.
