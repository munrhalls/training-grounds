// start 8.11.2025 16;25

export default function Hangman() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="relative w-full h-3/5">
        <div className="-translate-y-24 translate-x-4 absolute top-0 right-0 w-96 h-4 flex flex-row items-end">
          <div className="translate-x-4 bg-black h-4 w-1/2 origin-bottom-right -rotate-30"></div>
          <div className="bg-black h-4 w-1/2 origin-bottom-left rotate-30"></div>
        </div>

        <div className="absolute top-0 bottom-0 right-1/5 w-4 bg-black"></div>
      </div>
    </div>
  );
}
