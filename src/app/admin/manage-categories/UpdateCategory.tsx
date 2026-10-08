"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

interface UpdateCategoryProps {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
}

const UpdateCategory = ({
  categoryId,
  categoryName,
  categorySlug,
}: UpdateCategoryProps) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(categoryName);
  const [slug, setSlug] = useState(categorySlug);

  const router = useRouter();

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`/api/categories/${categoryId}`, {
        name,
        slug,
      });

      toast.success("Category updated successfully");

      setOpen(false);

      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to update category",
        );

        console.log(error);
      }
    }
  };

  return (
    <>
      <FaEdit
        className="text-muted transition-colors hover:text-primary-hover cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <div className="flex shrink-0 items-center justify-between border-b border-border p-5">
              <h2 className="text-xl font-semibold text-foreground">
                Edit Category
              </h2>

              <IoMdCloseCircleOutline
                onClick={() => setOpen(false)}
                className="cursor-pointer text-2xl text-muted transition-colors hover:text-foreground"
              />
            </div>

            <form
              onSubmit={formSubmitHandler}
              className="flex flex-col gap-4 overflow-y-auto p-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  name
                </label>

                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  slug
                </label>

                <input
                  type="text"
                  placeholder="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="sticky bottom-0 w-full rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Update Category
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCategory;
