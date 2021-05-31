import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-mail: </label>
        <input type="text" id="email" {...register("email")} />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" {...register("password")} />
        <button>sign up</button>
      </form>
    </div>
  );
}

export default Login;
