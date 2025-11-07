// DRILL 4: Practice type narrowing
export const Drill = () => {
  const getValue = (input: string | number) => {
    // TODO: If input is a number, return input * 2
    // TODO: If input is a string, return input.toUpperCase()
    // Use typeof to narrow the type

    if (typeof input == "string") {
      return input.toUpperCase();
    } else {
      return input * 2;
    }
  };

  return (
    <div>
      <p>{getValue(5)}</p>
      <p>{getValue("hello")}</p>
    </div>
  );
};

export default Drill;
