/*
 * The Self-Owned Auto-Reset Button
 *
 * Goal:
 *   Create a single, self-contained component that manages multiple states and uses a timed side-effect,
 *   demonstrating that all logic is fully encapsulated within the component boundary. The component must own its full lifecycle:
 *   interaction, side effect, and cleanup.
 *
 * Requirements:
 *   - Component: Create a single functional component named AutoResetButton.
 *   - State Management: Use two useState variables:
 *       - one for a numeric count (starts at 0)
 *       - one for a string message (starts as "Click to begin")
 *   - Interaction: A single button should increment the count state and simultaneously set the message to "Reset in 2 seconds...".
 *   - Cleanup Primitive (CRITICAL):
 *       - Use a useEffect hook that watches the count state.
 *       - If count > 0, it must set a setTimeout of 2000ms (2 seconds) to reset both count to 0 and message to "Ready. Resetted!".
 *       - The useEffect MUST return a cleanup function that clears the setTimeout to prevent stale state updates if the user clicks the button again before the 2 seconds are up.
 */
import { useState, useEffect } from "react";

const AutoResetButton = function () {
  const [message, setMessage] = useState("Click to begin");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (message === "Click to begin" && count === 0) return;

    let timeout;
    if (count > 0) {
      timeout = setTimeout(() => {
        console.log("yo");
        setCount(0);
        setMessage("Ready. Resetted!");
      }, 2000);
      setMessage("Reset in 2 seconds...");
    } else {
      setCount((prev) => prev + 1);
    }
    return clearTimeout(timeout);
  }, [count]);

  return (
    <div className="h-screen w-screen flex flex-col space-y-8 justify-center items-center">
      <h1>Message: {message}</h1>
      <button onClick={() => setCount((prev) => prev + 1)} className="cursor-pointer bg-blue-600 p-4 rounded-lg text-white font-black">
        Click
      </button>
    </div>
  );
};
export default AutoResetButton;
