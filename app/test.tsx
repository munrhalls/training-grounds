import React, { useState, useEffect } from "react";

function useGigaCount(count) {
  const [gcount, setgCount] = useState(() => count);

  const setGiga = (update) => {
    setgCount((prev) => {
      let newval;
      if (typeof update === "function") {
        newval = update(prev);
      } else {
        newval = prev;
      }
      newval += 1000;
      return newval;
    });
  };
  return [gcount, setGiga];
}

export default function Test() {
  const [count, setCount] = useGigaCount(10);
  console.log("Test");

  function decrement() {
    setCount((zxcblablalbalbablablabl) => zxcblablalbalbablablabl - 1);
  }
  function increment() {
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <div className="h-screen w-full grid place-content-center">
      <button onClick={decrement}>-</button>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </div>
  );
}
