import React from "react";
import LoginForm from "./LoginForm";


const LoginPage = () => {
  return (
    <section className="flex items-center justify-cneter px-7">
      <div className="m-auto bg-card rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-foreground mb-5">Log in youre account</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
