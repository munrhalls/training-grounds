# await only works in async functions + two-step fetch()

## Question 1:

What's wrong with this code?

```js
const result = await fetch("/api/user");
console.log(result);
```

## My Response:

1.

- It's not inside async function and it has to be in order to use await
- it properly await promise (fetch(...)) but the promise returns json, which it doesnt unpack
- should (inside async function), perform const data = await result.json(); to unpack the data
