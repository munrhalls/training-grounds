import { useState, useEffect } from "react";

function AyncTimeout({ initialDelay }) {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCount(count + 1);
  //     console.log(count, "Click the button 5 times instantly. State count should be 5 from clicks plus from the code line above. What will the count state actually be? What will it print? Why?");
  //   }, initialDelay);

  //   return () => clearTimeout(timer);
  // }, [initialDelay]);

  // useEffect(() => {
  //   const timer = setTimeout((count) => {
  //     setCount(count + 1);
  //     console.log(count, "What will count state print now? Why?");
  //   }, initialDelay);

  //   return () => clearTimeout(timer);
  // }, [initialDelay]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCount(() => count + 1);
  //     console.log(count, "Does that solve the problem? Why?");
  //   }, initialDelay);

  //   return () => clearTimeout(timer);
  // }, [initialDelay]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCount((bla) => bla + 1);
  //     console.log(count, "Does that solve the problem? Why?");
  //   }, initialDelay);

  //   return () => clearTimeout(timer);
  // }, [initialDelay]);

  // useEffect(() => {
  //   const timer = setTimeout(
  //     (yhm) => {
  //       setCount((yhm) => yhm + 1);
  //       console.log(count, "Does that solve the problem? Why?");
  //     },
  //     initialDelay,
  //     count
  //   );

  //   return () => clearTimeout(timer);
  // }, [initialDelay]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((count) => count + 1);
      console.log("This works. Why?");
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  return (
    <div className="grid place-content-center">
      {count}
      <button className="cursor-pointer border-black border-2 p-12 text-xl" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

export default AyncTimeout;
