import { useForm } from "react-hook-form";

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <label htmlFor="isDeveloper">Is an developer?</label>
        <input type="checkbox" placeholder="luo" value={true} {...register("isDeveloper")} />
      </div>
      {errors.firstName && <span>This field is required!!!!!</span>}
      <input type="submit" />
    </form>
  );
}
