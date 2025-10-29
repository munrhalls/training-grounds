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
