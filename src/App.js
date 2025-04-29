import React, { useState } from "react";
import "./App.css";

const exercises = [
  {
    title: "Cek Umur",
    prompt: "Lengkapi bagian kosong syntax berikut untuk menentukan apakah pengguna sudah remaja.",
    codeParts: [
      "int umur;",
      "cout << \"Masukkan umur: \";",
      "cin >> umur;",
      "if (", ") {",
      "  cout << \"Kamu sudah remaja.\";",
      "} else {",
      "  cout << \"Kamu masih anak-anak.\";",
      "}"
    ],
    blanks: ["umur >= 13"],
  },
  {
    title: "Genap atau Ganjil",
    prompt: "Isi bagian kosong untuk menentukan apakah angka genap atau ganjil.",
    codeParts: [
      "int angka;",
      "cout << \"Masukkan angka: \";",
      "cin >> angka;",
      "if (", ") {",
      "  cout << \"Angka genap.\";",
      "} else {",
      "  cout << \"", "\";",
      "}"
    ],
    blanks: ["angka % 2 == 0", "Angka ganjil."],
  },
  {
    title: "Jawaban Kuis",
    prompt: "Lengkapi bagian kosong untuk mengecek jawaban ya/tidak.",
    codeParts: [
      "char jawab;",
      "cout << \"Apakah bumi itu bulat? (y/n): \";",
      "cin >> jawab;",
      "if (jawab == 'y' || jawab == 'Y') {",
      "  cout << \"Benar!\";",
      "} else if (jawab == 'n' || jawab == 'N') {",
      "  cout << \"Salah, coba lagi.\";",
      "} else {",
      "  cout << \"", "\";",
      "}"
    ],
    blanks: ["Jawaban tidak dikenali."],
  }
];

export default function IfElsePractice() {
  const [current, setCurrent] = useState(0);
  const [userInputs, setUserInputs] = useState([]);
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (value, index) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  const checkAnswer = () => {
    const correctBlanks = exercises[current].blanks;
    const score = correctBlanks.reduce((acc, correct, i) => {
      return acc + (userInputs[i]?.trim().toLowerCase() === correct.trim().toLowerCase() ? 1 : 0);
    }, 0);

    setFeedback(`✅ Skor: ${score} dari ${correctBlanks.length}`);
  };

  const currentExercise = exercises[current];

  return (
    <div className="container">
      <h1 className="title">🎮 Latihan If-Else C++</h1>
      <div className="card">
        <h2 className="subtitle">📘 {currentExercise.title}</h2>
        <p className="prompt">{currentExercise.prompt}</p>
        <pre className="code">
          {currentExercise.codeParts.map((part, index) =>
            index % 2 === 0 ? (
              <div key={index}>{part}</div>
            ) : (
              <input
                key={index}
                className="inline-input"
                placeholder="..."
                value={userInputs[Math.floor(index / 2)] || ""}
                onChange={(e) => handleInputChange(e.target.value, Math.floor(index / 2))}
              />
            )
          )}
        </pre>
        <button onClick={checkAnswer} className="button primary">
          ✔️ Cek Jawaban
        </button>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
      <div className="navigation">
        <button
          onClick={() => {
            setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
            setUserInputs([]);
            setFeedback("");
          }}
          className="button"
        >
          ⬅️ Sebelumnya
        </button>
        <button
          onClick={() => {
            setCurrent((prev) => (prev < exercises.length - 1 ? prev + 1 : prev));
            setUserInputs([]);
            setFeedback("");
          }}
          className="button success"
        >
          Selanjutnya ➡️
        </button>
      </div>
    </div>
  );
}
