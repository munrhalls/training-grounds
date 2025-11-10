// Quick React Warm-up Drill: "Debounced Auto-Save"

// Build a text input that saves to localStorage 2 seconds after the user stops typing.

// Requirements:

// Show "Typing..." while user is actively typing
// Show "Saving..." during the 2-second countdown
// Show "Saved ✓" after successfully saving
// If user types again before 2 seconds, reset the timer
// Load saved value on mount
// Key concepts tested:

// useEffect cleanup to cancel pending saves
// Debouncing pattern
// Side effects (localStorage)
// State management for UI feedback
// Bonus challenge: Make it work even if the user closes and reopens the page mid-countdown (should it resume or start fresh?).

/////////////////////////////////////////////////////////////////
// 18;55
// Time to: 19;05
// 19;05 NOT QUITE COMPLETED
// extra time to 19;10 but then hard stop

/*
UNDERSTANDING
- stateful comp responding to input
- stopped typing triggers timeout
- timeout resets if typing resumed
- timeout finish triggers saving event
- which also cancels if user resumed typing
- but if it finishes, it saves to local storage
- on mount, attempt to load from local storage

PLAN
- make input, basic handler /w event, on key up
- make debounced f via stateful factory f
- use that to handle the initial prob
- for saving, also use debounced f via stateful factory f
- handle ls etc and on mount via useffect

*/
import { useState, useEffect } from "react";

const AutoSaveInput = function () {
  const [text, setText] = useState("");

  const handleSave = () => {
    console.log("save");
  };

  const debouncedTimeout = (func, delay) => {
    let timerId;

    const inner = function () {
      clearTimeout(timerId);
      setTimeout(() => {
        func();
      }, delay);
    };
    return inner;
  };
  const handleStoppedTyping = () => {
    // here need timeout that resets when user resumes typing
    // so need f that starts timeout - but if called again, it resets timeout
    // console.log("?");
    const handleTimeout = debouncedTimeout(handleSave, 1000);
    handleTimeout();
  };

  return (
    <div>
      <input type="text" className="border-2 border-black" onKeyUp={handleStoppedTyping} onChange={(e) => setText(e.target.value)} value={text} />
    </div>
  );
};

export default function MorningDrills() {
  return (
    <>
      <AutoSaveInput />
    </>
  );
}
