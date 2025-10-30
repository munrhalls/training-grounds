/*
 * Exercise 1: Basic Promise Creation
 *
 * Primitive: Understanding Promise construction
 *
 * Goal: Create a function waitOneSecond() that returns a Promise
 * which resolves with the string "Done!" after 1 second.
 */

const waitOneSecond = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, 1000);
  });
};

export default waitOneSecond;
