// Exercise 4: HOC Receives Component Reference, Not Element
// TODO: Define MyComponent = () => <div>Original</div>
// TODO: Define withStyle = (WrappedComponent) => { console.log(typeof WrappedComponent); return (props) => <div style={{color: 'red'}}><WrappedComponent {...props} /></div> }
// TODO: Try WRONG: const StyledElement = withStyle(MyComponent());
// TODO: Fix to RIGHT: const StyledComponent = withStyle(MyComponent);
// TODO: Render <StyledComponent />

export default function HocInputCheck() {
  const MyComp = () => {
    return <div>Original</div>;
  };

  const withStyle = (WrappedComp) => {
    return (props) => {
      return (
        <div className="border-pink-700 border-2">
          <WrappedComp {...props} />
        </div>
      );
    };
  };

  const StyledMyComp = withStyle(MyComp);
  return (
    <div>
      <StyledMyComp />
      {/* {TODO withStyle(MyComp)} // Technically works*/}
      {/* TODO Why you should NEVER do that? */}
      {/* TODO What specific bad consequence happens because of that? */}
    </div>
  );
}
