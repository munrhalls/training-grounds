// Objective: Controlled State Toggle
// Create a component named DependentToggle that manages two related boolean states, isActive and isReady, and uses useEffect to ensure state changes are synchronized and clean.

// Task Requirements:
// States: Use useState for:

// isActive (Boolean, defaults to false).

// isReady (Boolean, defaults to false).

// counter (Integer, defaults to 0).

// User Interaction:

// A button to toggle the isActive state.

// A button to increment the counter state.

// useEffect Logic (The Primitive):

// Create a single useEffect that runs only when isActive changes.

// Inside useEffect:

// If isActive is true, set isReady to true after a 2500ms delay (use setTimeout).

// If isActive is false, immediately set isReady to false.

// Cleanup Function (The Primitive):

// Ensure the useEffect returns a cleanup function.

// This cleanup function must clear the setTimeout to prevent updates on unmounted or re-rendered components, demonstrating proper effect cancellation.

// Summary of Primitives to Practice:
// State Dependency Array: Using [isActive] to control effect execution.

// State Synchronization: Setting one state based on another within useEffect.

// Effect Cleanup: Returning a function to clear asynchronous timers (setTimeout).
import { useState, useEffect } from "react";

export default function ControlledStateToggle() {
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerToReady = setTimeout((isReady) => {
      if (isActive) setIsReady(true);
      console.log("ready", isReady);
    }, 2500);

    return () => {
      clearTimeout(timerToReady);
    };
  }, [isActive]);

  return (
    <div className="grid place-content-center h-screen w-screen space-y-7">
      <h1>{count}</h1>
      <div className={`grid place-content-center w-52 h-24  rounded-lg ${isReady ? "bg-blue-700" : "bg-gray-400"}`}>Is Ready: {isReady ? <h1>Yes </h1> : <h1> No </h1>}</div>
      <button
        style={{ background: `${isActive ? "blue" : "gray"}` }}
        onClick={() => {
          console.log(isActive, "active");
          setIsActive((x) => (x ? false : true));
        }}
        className="rounded-lg cursor-pointer p-4 text-black border-black border-2  font-black"
      >
        Toggle Me
      </button>
      <button onClick={() => setCount((x) => x + 1)} className="rounded-lg cursor-pointer p-4 border-black border-2 bg-gray-500 text-white font-black">
        Counter
      </button>
    </div>
  );
}
