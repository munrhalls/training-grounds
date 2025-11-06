//  Summary
// ✅ Closure capture in event handlers
// ✅ Updater functions vs direct state updates
// ✅ Reference equality for object state
// ✅ Spread operator creates new objects
// ✅ Event handlers receive event object as first param
// ✅ Lazy initialization with useState(() => ...)
// ✅ Props destructuring
// ✅ useEffect dependency array
// ✅ Conditional rendering patterns
// ✅ React's falsy value rendering rules

"use client";
import { useState, useEffect } from "react";

// ORIGINAL 5 EXERCISES:
// 1. ✅ Counter: Display number (0), button "Increment" that increases by 1
// 2. WelcomeUser: Takes firstName, lastName props, displays greeting using destructuring
// 3. AlertStatus: Takes isActive boolean, shows "Active" or "Inactive"
// 4. TitleUpdater: Changes document.title to "Mounted!" on first render only
// 5. ChildButton: App renders ChildButton, passes label="Submit"

// Exercise 2: WelcomeUser

// Exercise 3: AlertStatus

// Exercise 4: TitleUpdater

// Exercise 5: ChildButton

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

// Challenge 5: onClick understanding
// const Counter = function () {
//   const [count, setCount] = useState(0);
//   const [doubled, setDoubled] = useState(0);
//   console.log("RENDER:", count);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <h2>Doubled: {doubled}</h2>
//       <button
//         onClick={(count) => {
//           console.log("What is count?", count);
//           console.log("Type:", typeof count);
//           const newCount = count + 1;
//           setCount(newCount);
//           setDoubled(newCount * 2);
//         }}
//       >
//         Update
//       </button>
//     </div>
//   );
// };

// Challenge 5: onClick understanding
// const Counter = function () {
//   const [count, setCount] = useState(0);
//   const [doubled, setDoubled] = useState(0);
//   console.log("RENDER:", count);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <h2>Doubled: {doubled}</h2>
//       <button
//         onClick={(count) => {
//           console.log("What is count?", count);
//           console.log("Type:", typeof count);
//           const newCount = count + 1;
//           setCount(newCount);
//           setDoubled(newCount * 2);
//         }}
//       >
//         Update
//       </button>
//     </div>
//   );
// };

// Challenge 2: The Object Mutation
// const Mutator = function () {
//   const [user, setUser] = useState({ name: "Alice", age: 25 });

//   return (
//     <div className="space-y-4">
//       <h1>{user.name}</h1>
//       <h2>Age: {user.age}</h2>

//       <button
//         className="block"
//         onClick={() => {
//           // A: Same reference
//           const newUser = user;
//           newUser.age = 26;
//           setUser(newUser);
//           console.log("A: user === newUser?", user === newUser);
//         }}
//       >
//         A: Same Reference
//       </button>

//       <button
//         className="block"
//         onClick={() => {
//           // B: Spread creates NEW object
//           const newUser = { ...user };
//           newUser.age = 27;
//           setUser(newUser);
//           console.log("B: user === newUser?", user === newUser);
//         }}
//       >
//         B: Spread Operator
//       </button>

//       <button
//         className="block"
//         onClick={() => {
//           // C: Inline spread
//           setUser({ ...user, age: 28 });
//         }}
//       >
//         C: Inline Spread
//       </button>

//       <button
//         className="block"
//         onClick={() => {
//           // D: Mutate then spread
//           user.age = 29;
//           setUser({ ...user });
//           console.log("D: Created new object after mutation");
//         }}
//       >
//         D: Mutate Then Spread
//       </button>
//     </div>
//   );
// };

// VERY IMPORTANT
// Next Challenge: The Initial State Function, EXPENSIVE EXTRA RE-RENDERS
// function expensiveCalculation() {
//   console.log("EXPENSIVE CALCULATION RAN!");
//   return { value: Math.random() };
// }

// const InitialStateChallenge = function () {
//   //   const [data, setData] = useState(expensiveCalculation());
//   const [data2, setData2] = useState(() => expensiveCalculation());
//   const [counter, setCounter] = useState(0);

//   console.log("COMPONENT RENDERED");

//   return (
//     <div className="space-y-4">
//       {/* <h1>Data Value: {data.value.toFixed(4)}</h1> */}
//       <h2>Data2 Value: {data2.value.toFixed(4)}</h2>
//       <p>Render count: {counter}</p>

//       <button className="block bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setCounter((c) => c + 1)}>
//         Force Re-render (watch console!)
//       </button>
//     </div>
//   );
// };

function expensiveCalculation() {
  console.log("EXPENSIVE CALCULATION RAN!");
  return { value: Math.random() };
}

const InitialStateChallenge = function () {
  //   const [data, setData] = useState(expensiveCalculation());
  const [data2, setData2] = useState(() => expensiveCalculation());
  const [counter, setCounter] = useState(0);

  console.log("COMPONENT RENDERED");

  return (
    <div className="space-y-4">
      {/* <h1>Data Value: {data.value.toFixed(4)}</h1> */}
      <h2>Data2 Value: {data2.value.toFixed(4)}</h2>
      <p>Render count: {counter}</p>

      <button className="block bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setCounter((c) => c + 1)}>
        Force Re-render (watch console!)
      </button>
    </div>
  );
};

// Exercise 2: WelcomeUser - Props destructuring
const WelcomeUser = ({ firstName, lastName }) => {
  return (
    <h1>
      Welcome, {firstName} {lastName}!
    </h1>
  );
};

// Exercise 3: AlertStatus - Conditional rendering
const AlertStatus = ({ isActive }) => {
  return <p>{isActive ? "Active" : "Inactive"}</p>;
};

// Exercise 4: TitleUpdater - useEffect with empty deps
const TitleUpdater = () => {
  useEffect(() => {
    document.title = "Mounted!";
  }, []);

  return <div>Check the browser tab title!</div>;
};

// Exercise 5: ChildButton - Parent passes props to child
const ChildButton = ({ label }) => {
  return <button>{label}</button>;
};

const App = () => {
  return <ChildButton label="Submit" />;
};

export default function Interleaving() {
  return (
    <div className="min-h-screen grid place-content-center">
      <h1 className="text-2xl font-bold mb-4">DELIBERATE PRACTICE EXERCISES</h1>
      <div className="p-8 space-y-8 max-w-2xl">
        <section className="border p-4 rounded">
          <h2 className="font-bold mb-2">Exercise 2: WelcomeUser</h2>
          <WelcomeUser firstName="John" lastName="Doe" />
        </section>

        <section className="border p-4 rounded">
          <h2 className="font-bold mb-2">Exercise 3: AlertStatus</h2>
          <AlertStatus isActive={true} />
          <AlertStatus isActive={false} />
        </section>

        <section className="border p-4 rounded">
          <h2 className="font-bold mb-2">Exercise 4: TitleUpdater</h2>
          <TitleUpdater />
        </section>

        <section className="border p-4 rounded">
          <h2 className="font-bold mb-2">Exercise 5: ChildButton</h2>
          <App />
        </section>
      </div>
    </div>
  );
}
