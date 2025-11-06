"use client";
import { useState } from "react";

// 1. Counter: Display number (0), button "Increment" that increases by 1

// 2. WelcomeUser: Takes firstName, lastName props, displays greeting using destructuring

// 3. AlertStatus: Takes isActive boolean, shows "Active" or "Inactive"

// 4. TitleUpdater: Changes document.title to "Mounted!" on first render only

// 5. ChildButton: App renders ChildButton, passes label="Submit"

// const Counter = function () {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => setCount((bla) => bla + 1)}>+</button>
//     </div>
//   );
// };

// Challenge 1: Console Output Prediction
// const Counter = function () {
//   const [count, setCount] = useState(0);
//   console.log("RENDER:", count);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => setCount((bla) => bla + 1)}>+</button>
//     </div>
//   );
// };

// Challenge 3: The Triple Click Mystery
// const Counter = function () {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button
//         onClick={() => {
//           setCount((c) => c + 1);
//           setCount((c) => c + 1);
//           setCount((c) => c + 1);
//         }}
//       >
//         +3?
//       </button>
//     </div>
//   );
// };

// Challenge 4: The Stale Console
// const Counter = function () {
//   const [count, setCount] = useState(0);
//   console.log("RENDER:", count);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button
//         onClick={() => {
//           setCount((c) => c + 1);
//           console.log("After setState:", count);
//         }}
//       >
//         +
//       </button>
//     </div>
//   );
// };

// Challenge 5: Conditional Increment
const Counter = function () {
  const [count, setCount] = useState(0);
  console.log("RENDER:", count);

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() =>
          setCount((blabla) => {
            if (blabla < 10) return blabla + 1;
            return blabla;
          })
        }
      >
        +
      </button>
    </div>
  );
};

export default function Interleaving() {
  return (
    <div className="min-h-screen grid place-content-center">
      <h1>DELIBERATE PRACTICE EXERCISES</h1>
      <div className="p-8 space-y-6 max-w-2xl">
        {/* 1. Counter Component */}
        <Counter />
      </div>
    </div>
  );
}
