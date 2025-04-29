import React, { useState } from "react";
import "./App.css";

const exercises = [
  {
    title: "Isian: Cek Umur",
    prompt: "Isilah bagian kosong dengan syntax C++ yang tepat untuk menentukan apakah pengguna sudah remaja.",
    codeParts: [
      "int ", ";",
      "cout << \"Masukkan umur: \";",
      "", ">> umur;",
      "if (", " 13) {",
      "  cout << \"Kamu sudah remaja.\";",
      "} else {",
      "  cout << \"Kamu masih anak-anak.\";",
      "}"
    ],
    blanks: ["umur", "cin", "umur >="]
  },
  {
    title: "Isian: Genap atau Ganjil",
    prompt: "Lengkapi bagian kosong untuk menentukan apakah angka genap atau ganjil.",
    codeParts: [
      "int ", ";",
      "cout << \"Masukkan angka: \";",
      "cin ", " angka;",
      "if (", ") {",
      "  cout << \"Angka genap.\";",
      "} else {",
      "  cout << \"Angka ganjil\";",
      "}"
    ],
    blanks: ["angka", ">>", "angka % 2 == 0"]
  },
  {
    title: "Isian: Jawaban Kuis",
    prompt: "Lengkapi syntax berikut agar bisa mengecek jawaban ya/tidak dengan benar.",
    codeParts: [
      "", " jawab;",
      "", " << \"Apakah bumi itu bulat? (y/n): \";",
      "cin >> ", ";",
      "if (jawab == 'y' ", " jawab == 'Y') {",
      "  cout << \"Benar!\";",
      "} else if (jawab == 'n' ", " jawab == 'N') {",
      "  cout << \"Salah, coba lagi.\";",
      "} else {",
      "  cout << \"Jawaban tidak dikenali\";",
      "}"
    ],
    blanks: ["char", "cout", "jawab", "||", "||"]
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
      <h1 className="title">Latihan If-Else C++ (Isian)</h1>
      <div className="card">
        <h2 className="subtitle">{currentExercise.title}</h2>
        <p>{currentExercise.prompt}</p>
        <pre className="code">
          {currentExercise.codeParts.map((part, index) =>
            index % 2 === 0 ? (
              <div key={index}>{part}</div>
            ) : (
              <input
                key={index}
                className="inline-input futuristic"
                placeholder="..."
                value={userInputs[Math.floor(index / 2)] || ""}
                onChange={(e) => handleInputChange(e.target.value, Math.floor(index / 2))}
              />
            )
          )}
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
            setUserInputs([]);
            setFeedback("");
          }}
          className="button"
        >
          Sebelumnya
        </button>
        <button
          onClick={() => {
            setCurrent((prev) => (prev < exercises.length - 1 ? prev + 1 : prev));
            setUserInputs([]);
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
