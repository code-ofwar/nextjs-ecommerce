"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const router = useRouter();
  const logoutButtonHandler = async () => {
    try {
      await axios.delete(`${DOMAIN}/api/users/logout`);
      router.replace("/");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(error.response?.data?.message || "something went wrong");
        console.log(error);
      }
    }
  };
  return (
    <button
      onClick={logoutButtonHandler}
      className="w-fit rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
