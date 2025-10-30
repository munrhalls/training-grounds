/*
 * Exercise 4: try...catch with async/await
 *
 * Primitive: Error handling with async operations
 *
 * Goal: Write an async function fetchUser() that:
 * - Uses await fetch('/api/user')
 * - Converts response to JSON
 * - Returns the data if successful
 * - Catches any errors and returns { error: "Failed" } instead
 */

const fetchUser = async function () {
  try {
    const res = await fetch("/api/user");
    const data = await res.json();
    return data;
  } catch (err) {
    return { error: "Failed" };
  }
};

export default fetchUser;
