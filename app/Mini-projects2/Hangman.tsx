import { useState } from "react";

export default function Hangman() {
  const [partsLeft, setPartsLeft] = useState(6);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="h-4/5 w-full max-w-sm relative">
        <div className="absolute bottom-0 h-full w-4 left-1/4 -translate-x-1/2 bg-black"></div>
        <div className="absolute top-0 h-4 w-2/4 left-1/4 -translate-x-2 bg-black"></div>
        <div className="absolute top-0 h-16 w-2 right-1/4 mr-2 bg-black"></div>

        <div className="absolute top-16 left-[calc(75%-0.75rem)]">
          {/* each part needs to start hidden */}
          {/* un-hiding needs to proceed part by part as partsLeft state changes from 6-- to 0 */}

          <div className={`${!(partsLeft < 1) && "hidden"} absolute top-0 h-12 w-12 border-4 border-black rounded-full left-0 -translate-x-1/2`}></div>
          <div className={`${!(partsLeft < 2) && "hidden"} absolute top-12 h-24 w-4 bg-black left-0 -translate-x-1/2`}></div>
          <div className={`${!(partsLeft < 3) && "hidden"} absolute top-12 h-16 w-4 bg-black origin-top-right rotate-45 right-1`}></div>
          <div className={`${!(partsLeft < 4) && "hidden"} absolute top-12 h-16 w-4 bg-black origin-top-left -rotate-45 left-1`}></div>
          <div className={`${!(partsLeft < 5) && "hidden"} absolute top-36 h-16 w-4 bg-black origin-top-right rotate-45 -right-1`}></div>
          <div className={`${!(partsLeft < 6) && "hidden"} absolute top-36 h-16 w-4 bg-black origin-top-left -rotate-45 -left-1`}></div>
        </div>
      </div>
    </div>
  );
}
