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

## My Response:

I am tentative about this but:
A - the return output of that is just string 'Hello'. there is no promise in there anywhere. it's just a normal fucking function that has been moved to 'async land' for no reason. there is nothing to consume, that string returned is just normal string like anything else

B - this is fucking weird syntax I've not seen before - but it appears to be directly calling constructor method on the Promise, which will just run the prototype method resolve which just turns the internal state of a promise to "fulfilled" - but there is no fucking promise instance there - so idk how the Promise prototype is set up internall for that -i imagine it just returns the fucking 'hello' string immediately and it has the exact same effect as the A - where it's just a string and you caan't do shit about it
