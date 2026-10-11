"use client";

import { getCategories } from "@/apiCalls/categoryApiCalls";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: "",
  });
  const [slugEdited, setSlugEdited] = useState(false);

  const generateSlug = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${DOMAIN}/api/products`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
      });
      toast.success("product created succsessfully");
      setFormData({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        categoryId: "",
      });
      setSlugEdited(false);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="space-y-3 sm:space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => {
          const name = e.target.value;

          setFormData((prev) => ({
            ...prev,
            name,
            slug: slugEdited ? prev.slug : generateSlug(name),
          }));
        }}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
      />

      <input
        type="text"
        placeholder="Slug (auto-generated, editable)"
        value={formData.slug}
        onChange={(e) => {
          setSlugEdited(true);
          setFormData((prev) => ({
            ...prev,
            slug: e.target.value,
          }));
        }}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
      />

      <select
        value={formData.categoryId}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            categoryId: e.target.value,
          }))
        }
        required
        className="w-full min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
      >
        <option value="">Select category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            price: e.target.value,
          }))
        }
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
      />

      <input
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            stock: e.target.value,
          }))
        }
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
      />

      <textarea
        placeholder="Description"
        rows={5}
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
      />

      <input
        type="text"
        placeholder="Image"
        value={formData.image}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            image: e.target.value,
          }))
        }
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
      />

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.98] sm:text-base"
      >
        Create new product
      </button>
    </form>
  );
};

export default ProductForm;
