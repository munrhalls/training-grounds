# Event loop: sync first, then microtasks (promises)

## Question 5:

What will this log and in what order?

```js
console.log("1");
Promise.resolve().then(() => console.log("2"));
console.log("3");
```
