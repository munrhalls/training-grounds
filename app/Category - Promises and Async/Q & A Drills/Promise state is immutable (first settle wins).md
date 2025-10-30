# Promise state is immutable (first settle wins)

## Question 2:

Will this code log "Done!" or throw an error? Why?

```js
const promise = new Promise((resolve, reject) => {
  resolve("Done!");
  reject("Error!");
});
promise.then((res) => console.log(res));
```
