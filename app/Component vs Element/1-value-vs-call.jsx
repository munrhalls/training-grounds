// Exercise 1: Value vs. Call Trace
// TODO: Define Square component that returns <h1>A square</h1>
// TODO: Create const Ref = Square;
// TODO: Create const Result = Square();
// TODO: Create const Element = <Square />;
// TODO: console.log(typeof Ref, typeof Result, typeof Element);
// Expected: function, object, object

export default function ValueVsCall() {
  const Square = <h1>A square</h1>;
  const Ref = Square;
  const Result = Square();
  const Element = <Square />;
  console.log(Ref, Result, Element);
}
