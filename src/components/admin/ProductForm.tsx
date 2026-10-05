"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: "",
  });

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
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />

      <input
        type="text"
        placeholder="Slug"
        value={formData.slug}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, slug: e.target.value }))
        }
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />

      <textarea
        placeholder="Description"
        rows={5}
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />

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
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />

      <input
        type="text"
        placeholder="Image"
        value={formData.image}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, image: e.target.value }))
        }
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />

      <input
        type="text"
        placeholder="Category id"
        value={formData.categoryId}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            categoryId: e.target.value,
          }))
        }
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />

      <button
        type="submit"
        className="w-full rounded-md bg-purple-600 px-4 py-2.5 font-semibold text-white transition hover:bg-purple-700 active:scale-[0.98]"
      >
        Create new product
      </button>
    </form>
  );
};

export default ProductForm;
