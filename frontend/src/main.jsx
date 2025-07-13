import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { backend } from "declarations/backend";

function App() {
  const [status, setStatus] = useState("");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [aiNumber, setAiNumber] = useState(null);

  const startGame = async () => {
    setResult("");
    setGuess("");
    const res = await backend.aiPickNumber();
    setStatus(res);
    setAiNumber(null);
  };

  const submitGuess = async (e) => {
    e.preventDefault();
    if (!guess) return;
    const res = await backend.userGuess(Number(guess));
    setResult(res);
  };

  const revealAiNumber = async () => {
    const n = await backend.getAiNumber();
    setAiNumber(n);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white drop-shadow">
           Tebak Angka AI
        </h2>

        <div className="flex justify-center mb-5">
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-300"
          >
             Mulai / Reset Game
          </button>
        </div>

        <p className="text-center text-white/90 mb-4 text-lg">{status}</p>

        <form onSubmit={submitGuess} className="flex flex-col items-center gap-4">
          <input
            type="number"
            min="1"
            max="100"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Masukkan angka 1-100"
            disabled={!status || status.startsWith("Gagal")}
            className="w-2/3 px-4 py-3 rounded-full text-center text-lg font-semibold border-2 border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:bg-white/10 disabled:text-white/50 disabled:placeholder-white/30"
          />
          <button
            type="submit"
            disabled={!status || status.startsWith("Gagal")}
            className="bg-green-400 hover:bg-green-500 text-white font-bold px-5 py-2 rounded-full shadow-md transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
             Tebak
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center">
            <span className="inline-block bg-white/30 backdrop-blur rounded-full px-5 py-3 text-lg text-white font-bold shadow-lg">
              {result}
            </span>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={revealAiNumber}
            className="text-sm text-white/80 hover:text-white underline transition-colors duration-200"
          >
            Lihat Angka AI (Debug)
          </button>
        </div>

        {aiNumber !== null && (
          <p className="text-center text-white/80 mt-2">
            Angka AI: <span className="font-mono text-white font-bold">{aiNumber}</span>
          </p>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
