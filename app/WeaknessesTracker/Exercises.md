Here are simple, banal-focused exercises for each of those four weaknesses.

1. The "State vs. URL" Blind Spot
   Core Banal: The URL is a place to store state, just like useState.

Exercise 1.1: You have a URL: "/dashboard?view=profile". Write the one line of code (using useSearchParams) to read the value of view.

Exercise 1.2: A user is on the "/dashboard" page. Write the one line of code (using useRouter) to programmatically change the URL to "/dashboard?view=settings" without reloading the page.

Exercise 1.3: You have a variable const step = "billing". Write a React ternary operator (? :) that renders the <BillingComponent /> if step is "billing" and <ShippingComponent /> otherwise.

2. The "Sync vs. Async" Race Condition
   Core Banal: await pauses the async function, but the code outside it keeps running.

Exercise 2.1: Look at this code. What is the exact order (1, 2, 3) that the three console.log messages will appear in?

JavaScript

const myFetch = async () => {
await new Promise(r => setTimeout(r, 100)); // Simulates API call
console.log("B");
return "done";
}

console.log("A");
myFetch();
console.log("C");
Exercise 2.2 (The Flicker Bug): Look at this code. Which runs first: the router.push (which starts to unmount the component) or the setIsLoading(false) (which re-renders the component)?

JavaScript

const handleSubmit = async () => {
// ... await some api call ...
router.push("/confirmation");
setIsLoading(false); // The flicker
}
Exercise 2.3: Given the flicker bug in 2.2, what is the simplest, one-line fix to prevent the flicker? (Hint: The fix is not adding code).

3. The "Component Lifecycle" Blind Spot
   Core Banal: A component's local state is destroyed when it unmounts.

Exercise 3.1: A component has const [count, setCount] = useState(0). The user clicks a button, and setCount(5). The user then navigates to a new page (unmounting this component). When they click the "Back" button (re-mounting the component), what will the value of count be?

Exercise 3.2: You have a useEffect that starts a setInterval timer. This is bad. Write the complete useEffect, including the cleanup function, to correctly stop the setInterval when the component unmounts.

JavaScript

useEffect(() => {
const timerId = setInterval(() => {
console.log("tick");
}, 1000);

// TODO: Add the cleanup function here

}, []);
Exercise 3.3: A component starts an async fetch. Before the fetch finishes, the user navigates away, unmounting the component. The fetch then finishes and its .then() block tries to call setState(). Why is this a problem?

4. The "Event vs. Effect" Blind Spot
   Core Banal: useEffect runs because of a render. Event handlers run because of user interaction.

Exercise 4.1: Event or Effect? I want to log "component mounted" to the console one time when the component first appears. Do I use an event handler (like onClick) or useEffect?

Exercise 4.2: Event or Effect? I want to re-fetch user data when a "Refresh" button is clicked. Do I put the fetchData function inside a useEffect or an onClick handler?

Exercise 4.3: Event or Effect? I have a search input with a state variable searchTerm. I want to fetch new results every time the searchTerm state changes. Do I call my fetch function in the input's onChange handler, or in a useEffect that watches searchTerm?

Which of these four sections would you like to start with? You can just give me the answers to one of them.
