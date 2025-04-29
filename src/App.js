import React, { useState } from "react";
import "./App.css";

const exercises = [
  {
    title: "Cek Umur",
    prompt: "Lengkapi kode untuk menentukan apakah pengguna sudah remaja.",
    code: `int umur;\ncout << "Masukkan umur: ";\ncin >> umur;\nif (______) {\n  cout << "Kamu sudah remaja.";\n} else {\n  cout << "Kamu masih anak-anak.";}`,
    answer: "umur >= 13"
  },
  {
    title: "Genap atau Ganjil",
    prompt: "Lengkapi kode untuk menentukan apakah angka genap atau ganjil.",
    code: `int angka;\ncout << "Masukkan angka: ";\ncin >> angka;\nif (angka % 2 == 0) {\n  cout << "Angka genap.";\n} else {\n  cout << "______";}`,
    answer: "Angka ganjil."
  },
  {
    title: "Jawaban Kuis",
    prompt: "Lengkapi kode untuk mengecek jawaban ya/tidak.",
    code: `char jawab;\ncout << "Apakah bumi itu bulat? (y/n): ";\ncin >> jawab;\nif (jawab == 'y' || jawab == 'Y') {\n  cout << "Benar!";\n} else if (jawab == 'n' || jawab == 'N') {\n  cout << "Salah, coba lagi.";\n} else {\n  cout << "______";}`,
    answer: "Jawaban tidak dikenali."
  },
  {
    title: "Penilaian Nilai",
    prompt: "Lengkapi kode untuk menilai angka menjadi huruf.",
    code: `int nilai;\ncout << "Masukkan nilai: ";\ncin >> nilai;\nif (nilai >= 80) {\n  cout << "Nilai A";\n} else if (nilai >= 70) {\n  cout << "Nilai B";\n} else if (nilai >= 60) {\n  cout << "Nilai C";\n} else {\n  cout << "______";}`,
    answer: "Nilai D"
  },
  {
    title: "Cek Suhu",
    prompt: "Lengkapi kode untuk mengecek kondisi suhu.",
    code: `int suhu;\ncout << "Masukkan suhu (C): ";\ncin >> suhu;\nif (suhu < 20) {\n  cout << "Cuaca dingin";\n} else if (suhu <= 30) {\n  cout << "Cuaca normal";\n} else {\n  cout << "______";}`,
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

  const updateCodeWithInput = (code) => {
    // Ganti bagian "______" dengan input pengguna
    return code.split("______").map((part, index) => {
      if (index === 0) return part;
      return (
        <>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Isi jawaban..."
            className="code-input"
          />
          {part}
        </>
      );
    });
  };

  return (
    <div className="container">
      <h1 className="title">Latihan If-Else C++</h1>
      <div className="card">
        <h2 className="subtitle">{exercises[current].title}</h2>
        <p>{exercises[current].prompt}</p>
        <pre className="code">
          {updateCodeWithInput(exercises[current].code)}
        </pre>
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
