Based on our discussion, the struggle was not about capability but about running into a few very specific, advanced "gotchas" in React and Next.js.

These are the common blind spots you're hitting:

The "State vs. URL" Blind Spot: You are thinking of "state" as only useState or Context. A critical leap in web development is realizing the URL is also a form of state. Using it (like with ?step=...) is the standard way to manage "steps" or "views" that need to work with browser buttons.

The "Sync vs. Async" Race Condition: You are missing the root cause of the flicker. You are calling a fast, synchronous function (setIsLoading(false)) right next to a slow, asynchronous one (router.push()). The sync function always wins the race, causing the flicker before the async redirect finishes.

The "Component Lifecycle" Blind Spot: You are trying to manage the state of a component that is in the process of being destroyed. When router.push() is called, the form component is unmounting. Trying to clean up its state at the same time is what creates the conflict.

The "Event vs. Effect" Blind Spot: Earlier, you put an async function (an "event") inside a useEffect (an "effect"). This shows a gap in knowing when to use useEffect (for side effects based on renders) vs. when to just use a plain function (for user events like clicks).
