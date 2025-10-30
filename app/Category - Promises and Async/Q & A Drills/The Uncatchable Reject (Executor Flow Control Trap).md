# Gotcha 3: The Uncatchable Reject (Executor Flow Control Trap)

## Question:

In the code below, where does the `throw` error end up? Is it caught by the inner `catch` (inside the promise) or the outer `catch` (around the `await`), or neither?

```js
async function runGotcha() {
  try {
    // OUTER TRY
    await new Promise((resolve, reject) => {
      try {
        // Inner Try
        console.log(1);
        throw new Error("Internal Executor Error"); // <-- THE GOTCHA
      } catch (e) {
        console.log(2, e.message); // Inner Catch
        resolve("Inner Resolved");
      }
    });
    console.log(3); // Success path
  } catch (e) {
    // OUTER CATCH
    console.log(4, e.message);
  }
}

runGotcha();
// What is the output sequence (1, 2, 3, 4)?
```

**Type the output sequence and explain why the error _was_ caught internally.**

## My Response:

Output will be this:
1
2, "Internal Executor Error" (from e.message)
3

That's it. 4 never runs.

The exact trace with "why" per step:

- outer try block and try catch block in general, is pure javascript, it's not specific to promises themselves
- try runs, unpacking an in-place-made new promise instance is made
- we go inside the promise - new try catch block starts
- we log 1
- then we throw error, which moves us to inner catch block
- now, we log 2 and e.message
- now we resolve the promise, which actually means that promise itself - despite our throw error - is successful, it turns internally from pending to "fulfilled" status
- because of that, the outer catch block never runs
- we move out of the consumed promise - which happens to be unpacked but not stored anywhere by the way
- we log 3
  and that's all there is to this function

In short: error was caught internally because we threw error - and javascript try catch blocks are not promise specific, they just operate such that if error is thrown, catch block takes over - so that's what happens here - but it doesn't affect the promise instance itself

## Commentary:

That is a 100% accurate breakdown of the execution flow. You have perfectly isolated the Executor Error Handling Primitive from the Promise Consumption Primitive. This is a concept that often trips up even experienced developers.

### The Exact Trace and Primitive Violation

| Output          | Code Line                    | Primitive/Flow            | Explanation                                                                                                                           |
| --------------- | ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| (Starts)        | `runGotcha()`                | Outer Try Starts          | The entire function starts execution.                                                                                                 |
| 1               | `console.log(1);`            | Inner Try Starts          | The synchronous code inside the Promise Executor begins.                                                                              |
|                 | `throw new Error(...)`       | JavaScript Flow Primitive | The throw command instantly halts the inner try block and redirects control to the nearest synchronous catch block (the Inner Catch). |
| 2               | `console.log(2, e.message);` | Inner Catch               | The synchronous error is handled successfully by the inner catch. The message is logged.                                              |
|                 | `resolve('Inner Resolved');` | Promise State Primitive   | Since the error was caught and handled, the code proceeds to call `resolve()`. The Promise state flips from Pending to Fulfilled.     |
| (Exits Promise) | (N/A)                        | Outer Try Continues       | The `await` sees a fulfilled Promise, retrieves the result, and continues execution in the outer try block.                           |
| 3               | `console.log(3);`            | Success Path              | The success message is logged.                                                                                                        |
| (Finishes)      | (N/A)                        | Outer Catch Ignored       | The outer `catch` block is never executed because the promise was fulfilled, not rejected.                                            |

### Conclusion: The Correct Distinction

Your key takeaway is exactly right:

The inner `try...catch` block is a standard JavaScript flow control mechanism. It operates only on synchronous code errors (like `throw`, or accessing an undefined variable).

By catching the `throw` synchronously, you prevented the error from reaching the asynchronous Promise layer, which would have required calling `reject()` to trigger the outer `await`'s `catch` block.
