import React, { useState, useMemo } from "react";

// This child is "memoized." It should ONLY re-render if its props change.
const ChildComponent = React.memo(function ChildComponent({ onSave }) {
  console.log("CHILD RE-RENDERED (This is bad!)");
  return <button onClick={onSave}>Save</button>;
});

export function DrillOne() {
  const [count, setCount] = useState(0);

  // This is our "factory" for the onSave function.
  // It runs on EVERY SINGLE RENDER of DrillOne.
  const handleSave = useMemo(() => {
    console.log("Saving...");
  }, []);

  return (
    <div>
      <button className="border-2 border-black" onClick={() => setCount((c) => c + 1)}>
        Increment Parent ({count})
      </button>
      <hr />
      <ChildComponent onSave={handleSave} />
    </div>
  );
}

export default function MorningDrills() {
  return (
    <>
      <DrillOne />
    </>
  );
}
