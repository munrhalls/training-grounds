// 2. Multiplier with Pre-set Factor $\times$Goal: Create a function that takes a multiplier factor (n) and returns a new function that multiplies any given input by that retained factor.

const makeMultiplier = function (n) {
  const multiplier = function (num) {
    const result = num * n;
    console.log(`Multiplying by: ${n}, result: ${result}`);
  };
  return multiplier;
};

const multiplyByFive = makeMultiplier(5);
const multiplyBySeven = makeMultiplier(7);
const multiplyByTen = makeMultiplier(10);

multiplyByFive(3);
multiplyBySeven(3);
multiplyByTen(3);

setTimeout(() => {
  multiplyByFive(3);
}, 1000);
