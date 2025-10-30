# async functions always return promises

## Question 3:

What's the difference between these two?

```js
// A
async function fetchData() {
  return "Hello";
}

// B
function fetchData() {
  return Promise.resolve("Hello");
}
```
