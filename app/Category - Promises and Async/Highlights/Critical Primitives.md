# Critical Promise Primitives

## 1. Promise Execution Starts Immediately

**The moment you create a promise, it starts executing. It does NOT wait for `await` or `.then()`.**

```js
const promise = new Promise((resolve) => {
  console.log("This runs IMMEDIATELY!");
  setTimeout(() => resolve("Done"), 1000);
});
// Logs "This runs IMMEDIATELY!" right away

// await/then only EXTRACTS the result later
```

**Key:** Promise creation = start work. `await`/`.then()` = get result.

---

## 2. Promise State is Immutable (First Settle Wins)

**Once a promise resolves or rejects, it's locked forever. All subsequent calls are ignored.**

```js
new Promise((resolve, reject) => {
  resolve("Done!"); // ✅ Promise → fulfilled
  reject("Error!"); // ❌ IGNORED
  resolve("Again!"); // ❌ IGNORED
});
```

**Key:** First `resolve()` or `reject()` wins. Promise = one-time container.

---

## 3. fetch() is Two Promises

**`fetch()` requires two `await` calls: one for the Response object, one for the data.**

```js
const response = await fetch("/api/user"); // Promise 1: Response object
const data = await response.json(); // Promise 2: Parsed data
```

**Key:** Don't forget the second `await` on `.json()`!

---

## 4. Promise Rejection ≠ Application Error

**A fulfilled promise with error data is NOT the same as a rejected promise.**

```js
// Promise FULFILLS with status 200, but server says "error"
const json = await response.json(); // Promise fulfilled ✅
if (json.error) {
  // This is application-level error checking
  // catch block will NOT run
}

// vs.

// Promise REJECTS (network failure, invalid JSON)
const json = await response.json(); // Promise rejected ❌
// catch block WILL run
```

**Key:** Check for application errors manually. Don't assume `catch` will handle them.

---

## 5. async Functions Always Return Promises

**Even if you return a plain value, `async` wraps it in a promise.**

```js
async function fetchData() {
  return "Hello"; // Plain string
}

const result = fetchData();
// result is NOT 'Hello'
// result is Promise { 'Hello' }

// Must await it:
const str = await fetchData(); // 'Hello'
```

**Key:** `async` = automatic promise wrapping. Always returns a promise.

---

## 6. Event Loop: Synchronous First, Then Microtasks

**All synchronous code runs first. Promise callbacks go to the microtask queue and run after.**

```js
console.log("1"); // Sync
Promise.resolve().then(() => console.log("2")); // Microtask (queued)
console.log("3"); // Sync

// Output: 1, 3, 2
```

**Key:** Call stack clears completely before microtask queue runs.
