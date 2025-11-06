const withLabel = (Comp) => (props) =>
  (
    <div>
      <label>{props.label}</label>
      <Comp {...props} />
    </div>
  );

const LabeledInput = withLabel((props) => <input {...props} />);

function Form() {
  const [name, setName] = useState("");

  return (
    <div>
      <LabeledInput label="Name:" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
export default Form;
