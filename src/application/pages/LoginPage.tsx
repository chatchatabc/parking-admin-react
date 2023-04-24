import React from "react";
import MyInput from "../components/MyInput";

function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center container mx-auto px-4 lg:px-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Davao Parking Dashboard</h1>
        <h2 className="text-2xl">Login Page</h2>
      </header>
      <form className="max-w-[300px] space-y-2 mt-8 w-full mx-auto">
        <MyInput
          name="username"
          label="Username"
          placeholder="Username"
          required
        />

        <MyInput
          type="password"
          name="username"
          label="Username"
          placeholder="Username"
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
