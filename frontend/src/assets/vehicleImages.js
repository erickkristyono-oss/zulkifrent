// Mengambil semua file gambar di folder ini secara otomatis (fitur Vite: import.meta.glob)
// sehingga kita tidak perlu import satu-satu setiap kali menambah gambar baru.
const imageModules = import.meta.glob('./*.{png,jpg,jpeg,webp,gif,svg}', { eager: true });

// Buat map: "Avanza.jpg" -> url hasil bundling Vite
const imageMap = {};
for (const path in imageModules) {
    const fileName = path.split('/').pop(); // contoh: "./Avanza.jpg" -> "Avanza.jpg"
    imageMap[fileName] = imageModules[path].default;
}

/**
 * Cari gambar berdasarkan nama file yang disimpan di kolom `image_url` database.
 * Mendukung baik nilai "Avanza.jpg" maupun "/images/Avanza.jpg" (ambil nama filenya saja).
 * Mengembalikan null kalau gambar tidak ditemukan (supaya bisa fallback ke emoji).
 */
export function getVehicleImage(imageUrl) {
    if (!imageUrl) return null;
    const fileName = imageUrl.split('/').pop();
    return imageMap[fileName] || null;
}