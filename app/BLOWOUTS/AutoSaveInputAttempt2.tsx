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

/*
UNDERSTANDING
### looking for?
- pattern, combining timeouts with events in sequence + resets on input
###

PLAN
- get basic event in
- write debounce f /w timeout and combine /w on change
- write debounce timeout on save
TIME: UP UNTIL 18;11 (5 minutes)

*/

import { useState } from "react";

export default function MorningDrills() {
  const [text, setText] = useState("");

  const save = () => {
    console.log("save");
  };
  const debouncedTimeout = (func, delay) => {
    let timerId;
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func();
    }, delay);
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };
  const handleStoppedTyping = () => {
    debouncedTimeout(save, 1000);
  };

  return (
    <div>
      <input type="text" className="border-2 border-black" onKeyUp={handleStoppedTyping} onChange={handleInput} value={text} />
    </div>
  );
}
