import React, { FormEvent } from "react";
import MyInput from "../components/MyInput";
import { authCheckSession, authLogin } from "../../domain/service/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const response = await authLogin(values);

    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response);
      navigate("/");
    }
  }

  React.useEffect(() => {
    if (authCheckSession()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center container mx-auto px-4 lg:px-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Davao Parking Dashboard</h1>
        <h2 className="text-2xl">Login Page</h2>
      </header>
      <form
        onSubmit={handleLogin}
        className="max-w-[300px] space-y-2 mt-8 w-full mx-auto"
      >
        <MyInput
          name="username"
          label="Username"
          placeholder="Username"
          required
        />

        <MyInput
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          required
        />

        <div>
          <button className="px-4 py-1 mt-8 bg-blue-500 rounded-md text-white mx-auto block w-fit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
