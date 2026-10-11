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
      <button
        type="button"
        aria-label="Edit category"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:bg-muted/20 hover:text-primary-hover"
      >
        <FaEdit className="text-lg" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-4">
          <div className="flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border p-4 sm:p-5">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                Edit Category
              </h2>

              <IoMdCloseCircleOutline
                onClick={() => setOpen(false)}
                className="shrink-0 cursor-pointer text-2xl text-muted transition-colors hover:text-foreground"
              />
            </div>

            <form
              onSubmit={formSubmitHandler}
              className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4 sm:p-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Slug
                </label>

                <input
                  type="text"
                  placeholder="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full shrink-0 rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:text-base"
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
