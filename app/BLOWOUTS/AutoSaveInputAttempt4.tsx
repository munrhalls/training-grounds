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

import { useState, useEffect, useMemo, useCallback } from "react";

const AutoSaveInput = function () {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const cancellableTimeout = useCallback(
    function (func, wait) {
      if (status === "Typing...") clearTimeout(timerId);
      let timerId = () => setTimeout(() => func(), wait);
    },
    [status]
  );

  const handleSave = function () {};

  const debouncedTimeout = function (func, delay) {
    let timerId;
    return function () {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        func();
      }, delay);
    };
  };

  const handleStoppedTyping = useMemo(() => debouncedTimeout(handleSave, 1000), []);

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
