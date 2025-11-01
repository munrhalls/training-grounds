// Exercise 2: Forbidden Function Call in Map
// TODO: Define ItemComponent that accepts { item } prop
// TODO: Create const items = [1, 2, 3];
// TODO: Try WRONG: items.map(item => ItemComponent(item))
// TODO: Fix to RIGHT: items.map(item => <ItemComponent item={item} />)
// TODO: Add key prop

// export default function ForbiddenFunctionCall() {
//   const ItemComp = function (item) {
//     return <div>{item}</div>;
//   };
//   const items = [1, 2, 3];
//   return <div>{items.map((item) => ItemComp(item))}</div>;
// }

// Seems okay - at least it works, save for adding keys props

// TODO: comment the above, exercise and re-do it with the below additional instruciton
// TODO: add button and counter feature via state hook to the ItemComp

import { useState } from "react";

const ItemComp = function ({ item }) {
  const [count, addCount] = useState(0);

  return (
    <div className="p-4 border border-gray-300 m-2">
      Item ID: {item}
      <button onClick={() => addCount((prev) => prev + 1)} className="ml-4 p-2 bg-green-500 text-white rounded">
        Item Count: {count}
      </button>
    </div>
  );
};

export default function ForbiddenFunctionCall() {
  const items = [1, 2, 3];
  const [parentCount, setParentCount] = useState(0);

  return (
    <div className="grid place-content-center h-screen w-screen">
      <button onClick={() => setParentCount((p) => p + 1)} className="mb-8 p-4 bg-red-500 text-white font-bold rounded">
        Force Parent Re-render ({parentCount})
      </button>

      <div className="flex">{items.map((item) => ItemComp({ item }))}</div>
    </div>
  );
}
