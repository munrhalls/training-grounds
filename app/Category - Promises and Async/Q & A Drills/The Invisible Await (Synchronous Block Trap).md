# Gotcha 1: The Invisible Await (Synchronous Block Trap)

## Question:

Why does the `catch` block fail to catch the error thrown by `networkCall(false)` in the code below?

```js
// Function Definition
const networkCall = (fail) =>
  new Promise((_, reject) => {
    if (fail) reject("Immediate Failure");
  });

// Consumption
async function runBuggy() {
  try {
    const result = networkCall(true); // <-- THE BUG IS HERE
    console.log("Success:", result);
  } catch (error) {
    console.error("Caught:", error);
  }
}

runBuggy();
```

What gets logged and why is the catch block never executed?

---

## Answer:

### What Gets Logged

1. `Success: Promise { <rejected>: "Immediate Failure" }` (or similar output)
2. A huge, red, runtime warning:
   ```
   UnhandledPromiseRejectionWarning: Immediate Failure
   ```

### Why the Catch Block Never Executes

**The error is that the promise rejected but no one was listening for the rejection.**

#### Execution Flow:

1. **Line 1:** `const result = networkCall(true);` runs

   - Instantly returns a **rejected Promise object**
   - No `await` = promise is not unpacked

2. **Line 2:** `console.log("Success:", result);` runs

   - Prints the rejected Promise object itself
   - This is **synchronous code** - no error thrown

3. **Try block finishes successfully**

   - No synchronous code failed
   - Promise object treated as a normal value

4. **Rejection floats into the event loop**
   - Promise was never `await`ed or given `.then().catch()`
   - Rejection has nowhere to go
   - Runtime throws global `UnhandledPromiseRejection` warning

### The Core Failure

**The `catch` block only monitors `await` operations, which never occurred!**

Without `await` or `.then()`, the promise is not unpacked. The `try` block treats it as a pending object, completely bypassing asynchronous error handling.

### The Fix:

```js
async function runFixed() {
  try {
    const result = await networkCall(true); // ✅ Added await
    console.log("Success:", result);
  } catch (error) {
    console.error("Caught:", error); // Now this runs!
  }
}
```

**Key Primitive:** `try/catch` only catches errors from `await`ed promises, not from promise objects themselves.
