// 1. Simple Counter with Timeout Verification ⏳
// Goal: Create a counter function that is incremented each time the returned function is called. Use setTimeout on the returned function to prove it holds the reference to the counter variable long after the outer function is done.

const makeCounter = function () {
  let count = 0;

  const counter = function () {
    count++;
    console.log(count);
  };
  return counter;
};

const counter = makeCounter();
counter();
setTimeout(() => {
  counter();
}, 1000);
setTimeout(() => {
  counter();
}, 2000);
setTimeout(() => {
  counter();
}, 3000);
