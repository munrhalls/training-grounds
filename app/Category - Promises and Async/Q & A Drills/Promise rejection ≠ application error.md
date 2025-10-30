# Promise rejection ≠ application error

## Question 4:

Will the catch block run? Why or why not?

```js
async function test() {
  try {
    const data = await fetch("/api/user");
    const json = await data.json();
    if (json.error) {
      return { error: json.error };
    }
    return json;
  } catch (err) {
    console.log("Caught error!");
  }
}
```
