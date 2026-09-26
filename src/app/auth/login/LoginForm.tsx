"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (email === "") {
      return toast.error("email is required");
    }
    if (password === "") {
      return toast.error("password is required");
    }
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/login`, {
        email,
        password,
      });
      router.replace("/");
      router.refresh();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 border-border rounded p-2 text-xl"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 border-border rounded p-2 text-xl"
      />
      <button
        type="submit"
        disabled={loading}
        className="text-2xl p-2 bg-primary hover:bg-primary-hover text-foreground rounded-lg font-bold"
      >
        {loading ? "loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
