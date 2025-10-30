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

## My Response:

Yes, it will run IF the promise instance turns internally its state to "rejected". That means its reject function runs internally and changes its state to "rejected". When that happens, the catch block - whether then syntax or try catch block syntax - runs. Therefore, it will run if the state of first insance is rejected. It will also run if the state of second instance is rejected. By second instance I mean data.json() (which runs RESPONSE OBJECT's method .json() but that doesn't matter - it's still a promise and if there promise's state is "rejected", it will transition immediately to the catch block). 

In short: json.error would only run if BOTH promises actually resolved to "fulfilled" and the json.error happened to exist somehow on the consumed actual object stuff saved to json variable.  if .error didn't exist, json variable would be returned successfully instead of that {error: json.error} . 

However, if any of the two promises turned state to "rejected" during their lifecycle of pending -> fulfilled/rejected, then it'd immediately transition over to catch block and it'd console.log('Caught error!')
