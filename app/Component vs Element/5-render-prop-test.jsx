// Exercise 5: Render Prop - Component Reference as Prop
// TODO: Define AnotherComponent = () => <p>Dynamic content</p>
// TODO: Define Renderer = (props) => { return <div><props.renderMe /></div> }
// TODO: Use: <Renderer renderMe={AnotherComponent} />
// Focus: Pass component reference, render with <props.renderMe />

export default function RenderPropTest() {
  const AnotherComp = () => <p>Dynamic content</p>;
  const Renderer = (props) => <div>{props.comp}</div>;
  return (
    <div>
      <Renderer comp={<AnotherComp />} />
    </div>
  );
}
