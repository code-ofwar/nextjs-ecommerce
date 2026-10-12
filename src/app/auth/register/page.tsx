import React from "react";
import RegisterForm from "./RegisterForm";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your KSP SHOP account.",
  robots: {
    index: false,
    follow: false,
  },
};

const RegisterPage = async () => {
  const cookieStore = await cookies();
  const token = (cookieStore.get("jwtToken")?.value as string) || "";
  const payload = verifyTokenForPage(token);
  if (payload) {
    redirect("/");
  }

  return (
    <section className="flex items-center justify-center px-4 py-6 sm:px-6">
      <div className="m-auto w-full rounded-lg bg-card p-4 sm:w-2/3 sm:p-6">
        <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-5 sm:text-2xl lg:text-3xl">
          Create new account
        </h1>

        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
