// 3. Personalized Greeter with Retained Name 👋
// Goal: Create a function that accepts a name and returns a personalized greeting function. The returned function should take a message and display the full greeting.

const personalizedGreeter = function (name) {
  const personalizedGreeting = function (message) {
    console.log(`Hello ${name} ${message}!`);
  };
  return personalizedGreeting;
};

const greetJane = personalizedGreeter("Jane");
greetJane(", have a good day!");
greetJane(", have a good night!");

const greetJazugha = personalizedGreeter("Jazugha");
greetJazugha(", have a good day!");
greetJazugha(", have a good night!");
