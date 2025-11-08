// start 8.11.2025 16;25

export default function Hangman() {
  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="relative">
        <div className="absolute -rotate-45 -top-45 left-0 border-t-black border-t-4 h-72 w-72 "></div>
        <div className="w-4 h-72 bg-black"></div>
      </div>
      <div>hangman</div>
    </div>
  );
}
