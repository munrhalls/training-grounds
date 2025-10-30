/*
 * Exercise 3: Basic async/await
 *
 * Primitive: Converting .then() to async/await
 *
 * Goal: Rewrite fetch().then().then() chain using async/await syntax
 *
 * Original code:
 * fetch('/api/user')
 *   .then(response => response.json())
 *   .then(data => console.log(data));
 */

const fetchUser = async function () {
  const res = await fetch("/api/user");
  const data = await res.json();
  console.log(data);
};

export default fetchUser;
