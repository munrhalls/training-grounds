# await only works in async functions + two-step fetch()

## Question 1:

What's wrong with this code?

```js
const result = await fetch("/api/user");
console.log(result);
```
