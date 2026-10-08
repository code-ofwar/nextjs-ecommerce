import { getCategories } from "@/apiCalls/categoryApiCalls";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { FaEdit } from "react-icons/fa";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-5xl px-5 py-7">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>

        <AddCategory />
      </div>

      <div className="mt-15 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(
          (category: { id: number; name: string; slug: string }) => (
            <div
              key={category.id}
              className="rounded-3xl border border-border bg-card p-5 shadow-sm transition duration-300 hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-center rounded-2xl bg-primary/10 p-5">
                <span className="text-2xl font-bold text-primary">
                  {category.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <h2 className="mb-1 text-lg font-bold text-foreground">
                name: {category.name}
              </h2>

              <p className="text-sm text-muted">slug: {category.slug}</p>

              <div className="mt-5 flex justify-end gap-3">
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
