"use client";
import { useState, useEffect } from "react";

const randomWordsList: string[] = [
  "PYTHON",
  "JAVASCRIPT",
  "TAILWIND",
  "REACT",
  "COMPUTER",
  "PROGRAMMING",
  "DATABASE",
  "ALGORITHM",
  "FUNCTION",
  "VARIABLE",
  "DEBUGGING",
  "SYNTAX",
  "BOOLEAN",
  "CONSOLE",
  "NETWORK",
  "HARDWARE",
  "SOFTWARE",
  "DEVELOPER",
  "INTERFACE",
  "COMPILER",
  "ROUTER",
  "FIREWALL",
  "SERVER",
  "MEMORY",
  "STORAGE",
  "CYBER",
  "WIDGET",
  "PROTOCOL",
  "API",
  "CLOUD",
];

const getRandomWordFromList = function (): string {
  const length = randomWordsList.length;
  const num = Math.floor(Math.random() * length);
  const word = randomWordsList[num];
  return word;
};

export default function Hangman() {
  const [partsLeft, setPartsLeft] = useState(6);
  const [nextLetter, setNextLetter] = useState("");
  const [gameWord, setGameWord] = useState("");
  const [record, updateRecord] = useState<string[]>([]);
  const [error, setError] = useState("");

  const letters = gameWord.split("");

  useEffect(() => {
    const gameWord = getRandomWordFromList();
    setGameWord(gameWord);
  }, []);

  const handleTurn = function () {};

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isAlreadyTriedLetter = record.filter((el) => el === nextLetter).length > 0;

    if (isAlreadyTriedLetter) {
      setError("You already tried that letter. Try another one.");
    } else {
      setError("");
      const newRecord = [...record, nextLetter];
      updateRecord(newRecord);
    }
  };
  // day start
  const handleInput = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const input = e?.target?.value ?? "";
    const letter = input.length ? input.charAt(input.length - 1) : input;
    const formattedLetter = letter.toUpperCase();
    setNextLetter(formattedLetter);
  };
  // for git commit log -> debrief
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex gap-2">
        <div>Attempted:</div>
        {record.map((letter, index) => (
          <span className="font-black" key={letter + index + "-record"}>
            {letter}
          </span>
        ))}
      </div>
      <div className="my-4 flex gap-3  justify-center items-center">
        <h1 className="font-black flex flex-col">
          <span>Your next</span>
          <span>GUESS:</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="text" className="uppercase border-2 w-16 h-16 border-black p-3 text-center" placeholder="..." value={nextLetter} onChange={(e) => handleInput(e)} />
          <button type="submit" className="border-2 border-black rounded-lg mt-2 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
      <div className="h-2/5 w-full max-w-md relative">
        <div className="absolute bottom-0 h-full w-4 left-1/4 -translate-x-1/2 bg-black"></div>
        <div className="absolute top-0 h-4 w-2/4 left-1/4 -translate-x-2 bg-black"></div>
        <div className="absolute top-0 h-16 w-2 right-1/4 mr-2 bg-black"></div>

        <div className="absolute top-16 left-[calc(75%-0.75rem)]">
          <div className={`${!(partsLeft < 1) && "hidden"} absolute top-0 h-12 w-12 border-4 border-black rounded-full left-0 -translate-x-1/2`}></div>
          <div className={`${!(partsLeft < 2) && "hidden"} absolute top-12 h-24 w-4 bg-black left-0 -translate-x-1/2`}></div>
          <div className={`${!(partsLeft < 3) && "hidden"} absolute top-12 h-16 w-4 bg-black origin-top-right rotate-45 right-1`}></div>
          <div className={`${!(partsLeft < 4) && "hidden"} absolute top-12 h-16 w-4 bg-black origin-top-left -rotate-45 left-1`}></div>
          <div className={`${!(partsLeft < 5) && "hidden"} absolute top-36 h-16 w-4 bg-black origin-top-right rotate-45 -right-1`}></div>
          <div className={`${!(partsLeft < 6) && "hidden"} absolute top-36 h-16 w-4 bg-black origin-top-left -rotate-45 -left-1`}></div>
        </div>
      </div>
      <div className="mt-12 flex flex-nowrap justify-center w-full gap-3 sm:gap-10 text-2xl sm:text-3xl">
        {letters.map((letter, index) => {
          return (
            <span key={index + letter} className="underline w-3">
              {letter}
            </span>
          );
        })}
      </div>
      {error && <div className="flex justify-center my-2 text-sm text-red-500 font-semibold">{error}</div>}
    </div>
  );
}
