// App.js
import React, { useState } from "react";
import "./App.css";

const exercises = [
  {
    title: "Age Check",
    description: "Fill in the blanks to complete the age check program",
    code: `int _____; 
cout << "Masukkan umur: ";
_____ >> umur; 
if ( _______ 13 ) { 
  cout << "Kamu sudah remaja.";
} else {
  cout << "Kamu masih anak-anak."; 
}`,
    blanks: [
      { id: 1, answers: ["umur"], hint: "Variable declaration for age" },
      { id: 2, answers: ["cin"], hint: "Input stream object" },
      { id: 3, answers: ["umur >=", "umur>="], hint: "Comparison operator for '13 or more'" }
    ]
  },
  {
    title: "Odd/Even Check",
    description: "Complete the program to check if a number is odd or even",
    code: `int ______; 
cout << "Masukkan angka: ";
cin _____ angka; 
if ( _________ ) {
  cout << "Angka genap.";
} else {
  cout << "Angka ganjil"; 
}`,
    blanks: [
      { id: 4, answers: ["angka"], hint: "Variable declaration for number" },
      { id: 5, answers: [">>"], hint: "Input operator" },
      { id: 6, answers: ["angka % 2 == 0", "angka%2==0"], hint: "Condition for even numbers" }
    ]
  },
  {
    title: "Yes/No Question",
    description: "Complete the yes/no question program",
    code: `_____ jawab; 
___ << "Apakah bumi itu bulat? (y/n): "; 
cin >> ______; 
if (jawab == 'y' ____ jawab == 'Y') { 
  cout << "Benar!";
} else if (jawab == 'n' ____ jawab == 'N') { 
  cout << "Salah, coba lagi.";
} else {
  cout << "Jawaban tidak dikenali"; 
}`,
    blanks: [
      { id: 7, answers: ["char"], hint: "Data type for single character" },
      { id: 8, answers: ["cout"], hint: "Output stream object" },
      { id: 9, answers: ["jawab"], hint: "Variable name for answer" },
      { id: 10, answers: ["||"], hint: "Logical OR operator" },
      { id: 11, answers: ["||"], hint: "Logical OR operator" }
    ]
  }
];

export default function IfElsePractice() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showHints, setShowHints] = useState(false);

  const handleAnswerChange = (id, value) => {
    setUserAnswers(prev => {
      const newAnswers = {...prev};
      newAnswers[id] = value;
      return newAnswers;
    });
  };

const checkAnswers = () => {
    const currentBlanks = exercises[currentExercise].blanks;
    const result = {};
    let score = 0;

    currentBlanks.forEach(blank => {
      const userAnswer = userAnswers[blank.id]?.replace(/\s+/g, '').toLowerCase() || '';
      const isCorrect = blank.answers.some(ans => ans.replace(/\s+/g, '').toLowerCase() === userAnswer);
      result[blank.id] = isCorrect;
      if (isCorrect) score++;
    });

    setResults(result);
    setFeedback(`Score: ${score}/${currentBlanks.length} (${Math.round((score/currentBlanks.length)*100)}%)`);
  };

  const [feedback, setFeedback] = useState("");

  const resetExercise = () => {
    setUserAnswers({});
    setResults(null);
    setFeedback("");
  };

  // In your App.js, modify the renderCodeWithInputs function:

// In your App.js, modify the renderCodeWithInputs function:

const renderCodeWithInputs = () => {
  const { code } = exercises[currentExercise];
  const blankRegex = /_{3,}/g;
  let blankIndex = 0;
  
  return code.split(blankRegex).map((part, index) => {
    if (index > 0) {
      const blankId = exercises[currentExercise].blanks[blankIndex]?.id;
      blankIndex++;
      return (
        <React.Fragment key={`input-${index}`}>
          <input
            className={`inline-input ${results && results[blankId] !== undefined ? 
              (results[blankId] ? 'correct' : 'incorrect') : ''}`}
            value={userAnswers[blankId] || ""}
            onChange={(e) => handleAnswerChange(blankId, e.target.value)}
            placeholder="..."
          />
          {part}
        </React.Fragment>
      );
    }
    return <span key={`text-${index}`}>{part}</span>;
  });
};

  return (
    <div className="container">
      <h1 className="title">C++ Fill-in-the-Blanks Practice</h1>
      
      <div className="card">
        <h2 className="subtitle">{exercises[currentExercise].title}</h2>
        <p>{exercises[currentExercise].description}</p>
        
        <div className="code">
          {renderCodeWithInputs()}
        </div>
        
        <div className="controls">
          <button onClick={checkAnswers} className="button primary">
            Check Answers
          </button>
          <button 
            onClick={() => setShowHints(!showHints)} 
            className="button"
          >
            {showHints ? "Hide Hints" : "Show Hints"}
          </button>
          <button onClick={resetExercise} className="button">
            Reset
          </button>
        </div>
        
        {showHints && (
          <div className="hints">
            <h3>Hints:</h3>
            <ul>
              {exercises[currentExercise].blanks.map(blank => (
                <li key={blank.id}>
                  <strong>Blank {blank.id}:</strong> {blank.hint}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {feedback && (
          <div className="feedback">
            {feedback}
          </div>
        )}
      </div>
      
      <div className="navigation">
        <button
          onClick={() => {
            setCurrentExercise(prev => Math.max(0, prev - 1));
            resetExercise();
          }}
          disabled={currentExercise === 0}
          className="button"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setCurrentExercise(prev => Math.min(exercises.length - 1, prev + 1));
            resetExercise();
          }}
          disabled={currentExercise === exercises.length - 1}
          className="button success"
        >
          Next
        </button>
      </div>
    </div>
  );
}