# Gotcha 4: The Unresolved Timeout (Memory Leak Trap)

## Question:

When the user clicks the "Cancel" button, we `reject` the promise immediately. What is the fundamental issue (leak or zombie code) that remains, and how would you fix the `failingFunction` to guarantee cleanup?

```js
// Assume this is run inside a component and 'cancel' is a controller
function failingFunction(cancel) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      // <-- THE BUG IS HERE
      resolve("Data received");
    }, 5000);

    if (cancel) {
      reject("Canceled by user");
    }
    // No explicit mechanism for cleanup
  });
}

// Assume the component calls:
// failingFunction(true).catch(e => console.log(e));
// What problem still exists 5 seconds later, and how do you fix 'failingFunction'?
```

## My Response:

First of all the point of the function is non-existent unless it is hooked up to some kind of AbortController that makes already instantiated promise instance responsive and listening to cancel event, so it can be cancelled mid-flight

However, let's assume this is the case:

- we run failingFunction(true), so the promise instantly rejects but it also adds timeout to the queue
- if we click it 10 times = 10 timeouts added to the tasks queue (async)
- what we need to do is this

```js
if (cancel) {
  reject("Canceled by user");
  clearTimeout(timer);
}
```

## Commentary:

That is an absolutely perfect diagnosis of the memory leak and the correct primitive for fixing it! You have correctly identified the Cleanup Primitive in the context of a pure JavaScript `Promise`:

**The Problem:** The setTimeout is an asynchronous task (a "zombie process") that, once started, will run to completion (5 seconds later) even if the promise is instantly rejected. It wastes memory and CPU cycles.

**The Primitive:** To stop a setTimeout, you must use `clearTimeout(timerId)`.

**The Implementation:** You must access the timer variable inside the synchronous cancellation path (`if (cancel)`) and execute the cleanup primitive there.

### 🛑 Gotcha 4: The Cleanup Primitive (Correction)

**The Problem That Still Exists**

The problem that still exists 5 seconds later is the **Zombie Timer**. Even though the consuming code receives the rejection instantly ("Canceled by user"), the setTimeout function still executes its callback 5 seconds later and tries to call `resolve("Data received")` on an already-settled promise.

While resolving an already rejected promise doesn't change its state (promises are immutable once settled), it is a source of performance degradation, wasted resources, and potential confusion.

**The Fixed `failingFunction`**

Here is the correct implementation, ensuring that the timer is immediately cleared if the cancellation path is taken.

```js
// --- Corrected Code ---
function failingFunction(cancel) {
  return new Promise((resolve, reject) => {
    // 1. Timer ID is stored outside the if-block but inside the Executor
    let timer = setTimeout(() => {
      resolve("Data received");
    }, 5000);

    if (cancel) {
      // 2. Execute the Cleanup Primitive immediately
      clearTimeout(timer);
      // 3. Then, execute the Flow Control Primitive
      reject("Canceled by user");
    }
  });
}
```
