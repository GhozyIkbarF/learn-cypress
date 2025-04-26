// Soal 1: Klasifikasi Usia
// Buat program JavaScript yang menerima input usia beberapa orang. Program akan:
// ✅ Menentukan kategori usia:
// Anak-anak: 0–12 tahun
// Remaja: 13–17 tahun
// Dewasa: 18–59 tahun
// Lansia: 60+ tahun

const classifyAge = (age: number) => {
  if (age <= 12) return "Anak-anak";
  if (age <= 17) return "Remaja";
  if (age <= 59) return "Dewasa";
  return "Lansia";
};

interface AgeClassificationResult {
  [key: string]: number;
}

const AgeClassification = (ageList: number[]): AgeClassificationResult => {
  const result: AgeClassificationResult = {};

  for (const age of ageList) {
    const group = classifyAge(age);
    result[group] = (result[group] || 0) + 1;
  }

  for (const [group, count] of Object.entries(result)) {
    console.log(`${group}: ${count}`);
  }

  return result;
};

const ageList = [5, 12, 15, 20, 25, 30, 60, 70, 80];
AgeClassification(ageList);
console.log("\n");

// Soal 2: Kalkulator Sederhana
// Buat program kalkulator interaktif dengan menu:

// ✅ Minta pengguna memilih operasi (1–4)
// ✅ Minta dua angka
// ✅ Tampilkan hasil perhitungan

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi-fungsi operasi matematika
function tambah(a: number, b: number): number {
  return a + b;
}
function kurang(a: number, b: number): number {
  return a - b;
}
function kali(a: number, b: number): number {
  return a * b;
}
function bagi(a: number, b: number): number | string {
  return b !== 0 ? a / b : "Tidak bisa dibagi 0";
}

// Tampilkan menu
console.log("=== Kalkulator Interaktif ===");
console.log("1. Penjumlahan");
console.log("2. Pengurangan");
console.log("3. Perkalian");
console.log("4. Pembagian");

rl.question("Pilih operasi (1-4): ", (pilihan: string) => {
  rl.question("Masukkan angka pertama: ", (input1: string) => {
    rl.question("Masukkan angka kedua: ", (input2: string) => {
      const angka1: number = parseFloat(input1);
      const angka2: number = parseFloat(input2);
      let hasil: number | string;
      let operasi: string;

      switch (pilihan) {
        case "1":
          hasil = tambah(angka1, angka2);
          operasi = "Penjumlahan";
          break;
        case "2":
          hasil = kurang(angka1, angka2);
          operasi = "Pengurangan";
          break;
        case "3":
          hasil = kali(angka1, angka2);
          operasi = "Perkalian";
          break;
        case "4":
          hasil = bagi(angka1, angka2);
          operasi = "Pembagian";
          break;
        default:
          console.log("Pilihan tidak valid.");
          rl.close();
          return;
      }

      console.log(`\nOperasi: ${operasi}`);
      console.log(`Angka 1: ${angka1}`);
      console.log(`Angka 2: ${angka2}`);
      console.log(`Hasil: ${hasil}`);
      rl.close();
    });
  });
});
