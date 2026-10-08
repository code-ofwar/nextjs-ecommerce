"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface DeleteCategoryProps {
  categoryId: number;
}

const DeleteCategory = ({ categoryId }: DeleteCategoryProps) => {
  const router = useRouter();

  const deleteCategoryHandler = async () => {
    try {
      if (confirm("you want to delete this category, are you sure?")) {
        await axios.delete(`/api/categories/${categoryId}`);
        toast.success("Category deleted successfully");

        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to delete category",
        );
        console.log(error);
      }
    }
  };

  return (
    <button
      onClick={deleteCategoryHandler}
      className="text-muted transition-colors hover:text-red-500"
      aria-label="Delete category"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteCategory;
