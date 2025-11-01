import React from "react";

export default function ComponentVsElement() {
  const Square = function () {
    return <h1 className="border-black border-2 w-48 h-48 grid place-content-center my-4">Square</h1>;
  };

  const Ref = Square;
  const Result = Square();
  const Element = <Square />;
  console.log("What will Ref print? ", Ref);
  console.log("What will Result print? ", Result);
  console.log("What will element print? ", Element);

  const withStyleButton = function (WrappedComp) {
    return function (props) {
      return (
        <div>
          <button className="border-black border-2 p-4 rounded-lg">STYLE BUTTON</button>
          <WrappedComp />
        </div>
      );
    };
  };

  const StyleSquare = withStyleButton(Square);
  return (
    <div className="grid place-content-center h-screen w-screen">
      <StyleSquare />
    </div>
  );
}
