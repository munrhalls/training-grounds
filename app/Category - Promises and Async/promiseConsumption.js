/*
 * Exercise 2: Promise Consumption with .then()
 *
 * Primitive: Consuming promises with .then()
 *
 * Goal: Given a promise that resolves with 42,
 * log the value to the console using .then()
 */

const promise = Promise.resolve(42);

promise.then((res) => console.log(res));

export { promise };
