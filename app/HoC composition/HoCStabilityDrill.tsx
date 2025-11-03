import { useState } from "react";

// WRONG: HOC inside component
const withBorder = (Comp) => {
  const Bordered = (props) => (
    <div style={{ border: "2px solid red" }}>
      <Comp {...props} />
    </div>
  );
  Bordered.displayName = `withBorder(${Comp.displayName || Comp.name})`;
  return Bordered;
};

export default function Counter() {
  const [count, setCount] = useState(0);

  const Display = () => <div>Value: {count}</div>;
  const BorderedDisplay = withBorder(Display);

  return (
    <div>
      <BorderedDisplay />
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}
