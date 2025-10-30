# Promise state is immutable (first settle wins)

## Question 2:

Will this code log "Done!" or throw an error? Why?
```js
const promise = new Promise((resolve, reject) => {
  resolve('Done!');
  reject('Error!');
});
promise.then(res => console.log(res));
```

## My Response:

This code will outpout 'Done!'. That's because after resolve(...), the internal state of the promise shifts to "Fulfilled" and it ain't runnin' no more.
