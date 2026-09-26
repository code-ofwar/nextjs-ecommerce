import React from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <section className="flex items-center justify-cneter px-7">
      <div className="m-auto bg-card rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-foreground mb-5">Create new account</h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
