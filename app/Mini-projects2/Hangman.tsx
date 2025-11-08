// start 8.11.2025 16;25

export default function Hangman() {
  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="relative w-4 h-96">
        <div className="absolute top-0 right-0 w-96 h-4 flex flex-row items-end">
          <div className="bg-black h-4 w-1/2 origin-bottom-right -rotate-30"></div>
          <div className="bg-black h-4 w-1/2 origin-bottom-left rotate-30"></div>
        </div>
        <div className="absolute top-0 bottom-0 w-4 bg-black"></div>
      </div>
      <div>hangman</div>
    </div>
  );
}
