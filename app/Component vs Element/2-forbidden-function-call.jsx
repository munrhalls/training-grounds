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

export default function ForbiddenFunctionCall() {
  const ItemComp = function (item) {
    const [count, addCount] = useState(0);

    return (
      <div>
        {item}
        <button onClick={() => addCount((prev) => prev + 1)} className="w-48 h-24 border-2 border-black">
          {count}
        </button>
      </div>
    );
  };
  const items = [1, 2, 3];
  return <div className="grid place-content-center h-screen w-screen">{items.map((item) => ItemComp(item))}</div>;
}
