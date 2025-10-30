/*
 * Exercise 5: Promise that can fail
 *
 * Primitive: Creating and handling rejections
 *
 * Goal: Create a function randomSuccess() that returns a Promise that:
 * - Has a 50% chance to resolve with "Success!"
 * - Has a 50% chance to reject with "Failed!"
 * - Use Math.random() to decide
 */

const randomSuccess = function () {
  return new Promise((resolve, reject) => {
    const chance = Math.random();
    setTimeout(() => {
      if (chance > 0.5) {
        resolve("Success!");
      } else {
        reject("Failed!");
      }
    }, 1000);
  });
};

export default randomSuccess;
