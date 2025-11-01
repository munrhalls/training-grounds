// Exercise 4: HOC Receives Component Reference, Not Element
// TODO: Define MyComponent = () => <div>Original</div>
// TODO: Define withStyle = (WrappedComponent) => { console.log(typeof WrappedComponent); return (props) => <div style={{color: 'red'}}><WrappedComponent {...props} /></div> }
// TODO: Try WRONG: const StyledElement = withStyle(MyComponent());
// TODO: Fix to RIGHT: const StyledComponent = withStyle(MyComponent);
// TODO: Render <StyledComponent />

export default function HocInputCheck() {
  return <div></div>;
}
