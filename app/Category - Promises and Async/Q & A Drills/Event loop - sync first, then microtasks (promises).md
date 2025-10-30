# Event loop: sync first, then microtasks (promises)

## Question 5:

What will this log and in what order?

```js
console.log("1");
Promise.resolve().then(() => console.log("2"));
console.log("3");
```

## My Response:

1
3

2

WHY:
- because synchronous code ALWAYS executes first, it's the entire LAND of ALL SYNCHRONOUS CODE that ALWAYS EXECUTES FIRST
- then, the promises, async etc. - they are a kind of "escape hatch" into the second thread - or a second LAND, the ASYNC LAND - which always runs in the "background" and AFTER all the synchronous code  so  synchronous code keeps running uninterrupted, while the async does its stuff and when the async finishes, it triggers event to which the synchronous code responds - but between trigger and eventual completion event, the synchronous code was uninterrupted


what happens is that Promise.. here, with the value of '2' runs in that second async "LAND"; when it resolves, there are no more synchronous things to run in the event loop, so now it's time for async queue, so '2' goes
