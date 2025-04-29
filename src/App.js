import React, { useState } from "react";

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
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const checkAnswer = () => {
    const correct = exercises[current].answer.trim().toLowerCase();
    const input = userInput.trim().toLowerCase();
    const isCorrect = input === correct;
    setFeedback(isCorrect ? "✅ Jawaban benar!" : "❌ Jawaban masih salah, coba lagi.");
    if (isCorrect && !isAnswered) {
      setScore(score + 1);
      setIsAnswered(true);
    }
  };

  const goTo = (index) => {
    setCurrent(index);
    setUserInput("");
    setFeedback("");
    setIsAnswered(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Latihan If-Else C++</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 border border-blue-100">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">{exercises[current].title}</h2>
        <p className="mb-3 italic">{exercises[current].prompt}</p>
        <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap border border-gray-300">
          {exercises[current].code.replace(/______/g, userInput || "______")}
        </pre>
        <input
          className="mt-4 w-full px-4 py-2 border rounded-xl border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Tulis jawaban di sini..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          onClick={checkAnswer}
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
        >
          Cek Jawaban
        </button>
        {feedback && <p className="mt-3 text-lg font-semibold">{feedback}</p>}
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => goTo(current > 0 ? current - 1 : current)}
          className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl"
        >
          ⬅️ Sebelumnya
        </button>
        <span className="font-semibold">Soal {current + 1} dari {exercises.length}</span>
        <button
          onClick={() => goTo(current < exercises.length - 1 ? current + 1 : current)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl"
        >
          Selanjutnya ➡️
        </button>
      </div>

      {current === exercises.length - 1 && (
        <div className="text-center text-xl font-bold text-purple-700">
          🎉 Skor kamu: {score} dari {exercises.length}
        </div>
      )}
    </div>
  );
}
