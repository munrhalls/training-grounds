// Exercise 3: Function Call vs JSX Element
// TODO: Define Card component: const Card = () => <div>Card content</div>;
// TODO: In parent, try WRONG: return Card();
// TODO: Fix to RIGHT: return <Card />;
// Focus: Always use <Component /> not Component()

export default function RefusalToRender() {
  const Card = function () {
    return <div>Card content</div>;
  };
  return (
    <div>
      <Card />
    </div>
  );
}
