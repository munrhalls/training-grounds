// Objective: Controlled State Toggle
// Create a component named DependentToggle that manages two related boolean states, isActive and isReady, and uses useEffect to ensure state changes are synchronized and clean.

// Task Requirements:
// States: Use useState for:

// isActive (Boolean, defaults to false).

// isReady (Boolean, defaults to false).

// counter (Integer, defaults to 0).

// User Interaction:

// A button to toggle the isActive state.

// A button to increment the counter state.

// useEffect Logic (The Primitive):

// Create a single useEffect that runs only when isActive changes.

// Inside useEffect:

// If isActive is true, set isReady to true after a 200ms delay (use setTimeout).

// If isActive is false, immediately set isReady to false.

// Cleanup Function (The Primitive):

// Ensure the useEffect returns a cleanup function.

// This cleanup function must clear the setTimeout to prevent updates on unmounted or re-rendered components, demonstrating proper effect cancellation.

// Summary of Primitives to Practice:
// State Dependency Array: Using [isActive] to control effect execution.

// State Synchronization: Setting one state based on another within useEffect.

// Effect Cleanup: Returning a function to clear asynchronous timers (setTimeout).
