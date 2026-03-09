import React, { useState, useEffect, useRef } from "react";
import { Word } from "../data/vocabulary";
import { checkAnswer } from "../utils/grading";
import { useStore } from "../store/useStore";
import { ArrowRight, Check, X } from "lucide-react";

interface FlashcardProps {
  words: Word[];
  mode: "test" | "learn" | "revise" | "practice";
  onComplete: () => void;
}

export function Flashcard({ words, mode, onComplete }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [gradingMessage, setGradingMessage] = useState<string | undefined>();
  const [askGerman, setAskGerman] = useState(Math.random() > 0.5);

  const lastActivityRef = useRef(Date.now());
  const activeTimeRef = useRef(0);

  const { addPoints, addTime, updateWord, stats } = useStore();

  const currentWord = words[currentIndex];

  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    const interval = setInterval(() => {
      if (Date.now() - lastActivityRef.current < 9000) {
        activeTimeRef.current += 1;
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      clearInterval(interval);
      if (activeTimeRef.current > 0) {
        addTime(activeTimeRef.current);
      }
    };
  }, []);

  if (!currentWord) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Session Complete!
        </h2>
        <button
          onClick={onComplete}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const target = askGerman ? currentWord.german : currentWord.english;
    const result = checkAnswer(input, target, askGerman);

    setIsCorrect(result.isCorrect);
    setPointsEarned(result.points);
    setGradingMessage(result.message);
    setShowResult(true);

    if (result.isCorrect) {
      addPoints(result.points);
    }

    updateWord(currentWord.id, result.isCorrect, mode);

    addTime(activeTimeRef.current);
    activeTimeRef.current = 0;
  };

  const handleNext = () => {
    setShowResult(false);
    setInput("");
    setAskGerman(Math.random() > 0.5);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key >= "1" && e.key <= "7") {
      e.preventDefault();
      const charMap: Record<string, string> = {
        "1": "ä",
        "2": "ö",
        "3": "ü",
        "4": "ß",
        "5": "Ä",
        "6": "Ö",
        "7": "Ü",
      };
      const char = charMap[e.key];
      if (char) {
        setInput((prev) => prev + char);
      }
    }
  };

  const insertChar = (char: string) => {
    setInput((prev) => prev + char);
  };

  const renderShortcuts = () => (
    <div className="flex gap-2 justify-center mt-4">
      {[
        { key: "1", char: "ä" },
        { key: "2", char: "ö" },
        { key: "3", char: "ü" },
        { key: "4", char: "ß" },
        { key: "5", char: "Ä" },
        { key: "6", char: "Ö" },
        { key: "7", char: "Ü" },
      ].map(({ key, char }) => (
        <button
          key={key}
          type="button"
          onClick={() => insertChar(char)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-medium text-sm flex flex-col items-center gap-1 transition-colors"
        >
          <span className="text-xs text-gray-400">{key}</span>
          <span className="text-lg leading-none">{char}</span>
        </button>
      ))}
    </div>
  );

  const progress = (currentIndex / words.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium text-gray-500">
          {currentIndex + 1} / {words.length}
        </div>
        <div className="text-lg font-bold text-indigo-600">
          {stats.points} pts
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
        {/* Top Half - Light Blue - English */}
        <div className="flex-1 bg-blue-50 p-8 flex flex-col justify-center items-center min-h-[200px] border-b border-blue-100 relative">
          <span className="absolute top-4 left-4 text-xs font-bold text-blue-400 uppercase tracking-wider">
            English
          </span>
          {!askGerman && !showResult ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type English translation..."
                className="w-full px-6 py-4 text-lg border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                autoFocus
                autoComplete="off"
              />
              {renderShortcuts()}
            </form>
          ) : (
            <h2 className="text-3xl font-bold text-blue-900 text-center">
              {currentWord.english}
            </h2>
          )}
        </div>

        {/* Bottom Half - Light Red - German */}
        <div className="flex-1 bg-red-50 p-8 flex flex-col justify-center items-center min-h-[200px] relative">
          <span className="absolute top-4 left-4 text-xs font-bold text-red-400 uppercase tracking-wider">
            Deutsch
          </span>
          {askGerman && !showResult ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type German translation..."
                className="w-full px-6 py-4 text-lg border-2 border-red-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all bg-white"
                autoFocus
                autoComplete="off"
              />
              {renderShortcuts()}
            </form>
          ) : (
            <h2 className="text-4xl font-bold text-red-900 text-center">
              {currentWord.german}
            </h2>
          )}
        </div>

        {/* Action Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          {!showResult ? (
            <button
              onClick={() => handleSubmit()}
              className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-2xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              Check Answer <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <div
                className={`p-4 rounded-2xl flex items-center justify-between ${isCorrect ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
                  >
                    {isCorrect ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <X className="w-6 h-6" />
                    )}
                  </div>
                  <h3
                    className={`text-lg font-bold ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}
                  >
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </h3>
                </div>
                <div className="text-right">
                  {gradingMessage && (
                    <p className="text-sm font-medium text-amber-600 mb-1">
                      {gradingMessage}
                    </p>
                  )}
                  {isCorrect && pointsEarned > 0 && (
                    <span className="text-emerald-600 font-bold text-lg">
                      +{pointsEarned} pts
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gray-900 text-white text-lg font-semibold rounded-2xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                autoFocus
              >
                Next Word <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
