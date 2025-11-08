// start 8.11.2025 16;25

export default function Hangman() {
  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="relative w-4 h-96">
        <div className="absolute top-2 right-2 bg-black h-4 w-48 origin-bottom-right rotate-30  "></div>
        <div className="absolute   bg-black -top-20 right-2 h-4  w-48 mr-40 origin-top-right -rotate-30 "></div>
        <div className="absolute top-0 bottom-0 w-4 bg-black"></div>
      </div>
      <div>hangman</div>
    </div>
  );
}
