import { getCategories } from "@/apiCalls/categoryApiCalls";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { FaEdit } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories",
  description: "Manage categories in KSP SHOP.",
  robots: {
    index: false,
    follow: false,
  },
};

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Categories
        </h1>

        <AddCategory />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {categories.map(
          (category: { id: number; name: string; slug: string }) => (
            <div
              key={category.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm transition duration-300 hover:shadow-lg sm:rounded-3xl sm:p-5"
            >
              <div className="mb-4 flex items-center justify-center rounded-2xl bg-primary/10 p-4 sm:mb-5 sm:p-5">
                <span className="text-2xl font-bold text-primary">
                  {category.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <h2 className="mb-1 wrap-break-word text-base font-bold text-foreground sm:text-lg">
                Name: {category.name}
              </h2>

              <p className="break-all text-sm text-muted">
                Slug: {category.slug}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-end gap-2 sm:mt-5 sm:gap-3">
                <UpdateCategory
                  categoryId={category.id}
                  categoryName={category.name}
                  categorySlug={category.slug}
                />

                <DeleteCategory categoryId={category.id} />
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default CategoriesPage;
