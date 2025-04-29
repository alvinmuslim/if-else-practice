import React, { useState } from "react";
import "./App.css";

const exercises = [
  {
    title: "Cek Umur",
    prompt: "Lengkapi kode untuk menentukan apakah pengguna sudah remaja.",
    code: `int umur;
cout << "Masukkan umur: ";
cin >> umur;
if (______) {
  cout << "Kamu sudah remaja.";
} else {
  cout << "Kamu masih anak-anak.";}`,
    answer: "umur >= 13"
  },
  {
    title: "Genap atau Ganjil",
    prompt: "Lengkapi kode untuk menentukan apakah angka genap atau ganjil.",
    code: `int angka;
cout << "Masukkan angka: ";
cin >> angka;
if (angka % 2 == 0) {
  cout << "Angka genap.";
} else {
  cout << "______";}`,
    answer: "Angka ganjil."
  },
  {
    title: "Jawaban Kuis",
    prompt: "Lengkapi kode untuk mengecek jawaban ya/tidak.",
    code: `char jawab;
cout << "Apakah bumi itu bulat? (y/n): ";
cin >> jawab;
if (jawab == 'y' || jawab == 'Y') {
  cout << "Benar!";
} else if (jawab == 'n' || jawab == 'N') {
  cout << "Salah, coba lagi.";
} else {
  cout << "______";}`,
    answer: "Jawaban tidak dikenali."
  },
  {
    title: "Penilaian Nilai",
    prompt: "Lengkapi kode untuk menilai angka menjadi huruf.",
    code: `int nilai;
cout << "Masukkan nilai: ";
cin >> nilai;
if (nilai >= 80) {
  cout << "Nilai A";
} else if (nilai >= 70) {
  cout << "Nilai B";
} else if (nilai >= 60) {
  cout << "Nilai C";
} else {
  cout << "______";}`,
    answer: "Nilai D"
  },
  {
    title: "Cek Suhu",
    prompt: "Lengkapi kode untuk mengecek kondisi suhu.",
    code: `int suhu;
cout << "Masukkan suhu (C): ";
cin >> suhu;
if (suhu < 20) {
  cout << "Cuaca dingin";
} else if (suhu <= 30) {
  cout << "Cuaca normal";
} else {
  cout << "______";}`,
    answer: "Cuaca panas"
  }
];

export default function IfElsePractice() {
  const [current, setCurrent] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkAnswer = () => {
    const correct = exercises[current].answer.trim().toLowerCase();
    const input = userInput.trim().toLowerCase();
    setFeedback(input === correct ? "✅ Jawaban benar!" : "❌ Jawaban masih salah, coba lagi.");
  };

  return (
    <div className="container">
      <h1 className="title">Latihan If-Else C++</h1>
      <div className="card">
        <h2 className="subtitle">{exercises[current].title}</h2>
        <p>{exercises[current].prompt}</p>
        <pre className="code">
          {exercises[current].code.replace(/______/g, userInput || "______")}
        </pre>
        <input
          className="input"
          placeholder="Tulis jawaban di sini..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={checkAnswer} className="button primary">
          Cek Jawaban
        </button>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
      <div className="navigation">
        <button
          onClick={() => {
            setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
            setUserInput("");
            setFeedback("");
          }}
          className="button"
        >
          Sebelumnya
        </button>
        <button
          onClick={() => {
            setCurrent((prev) => (prev < exercises.length - 1 ? prev + 1 : prev));
            setUserInput("");
            setFeedback("");
          }}
          className="button success"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
