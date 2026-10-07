"use client";

import { DOMAIN } from "@/utils/constants";
import { Product } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

type UpdateProductProps = {
  product: Product;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UpdateProduct = ({ product, setOpen }: UpdateProductProps) => {
  const router = useRouter();

  const [name, setName] = useState(product.name ?? "");
  const [description, setdescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(product.price ?? "");
  const [stock, setStock] = useState(product.stock ?? "");
  const [image, setImage] = useState(product.image ?? "");
  const [slug, setSlug] = useState(product.slug ?? "");
  const [categoryId, setCategoryId] = useState(product.categoryId ?? "");

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${DOMAIN}/api/products/${product.id}`, {
        name,
        description,
        price,
        stock,
        image,
        slug,
        categoryId,
      });
      toast.success("Product updated succsessfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "update failed");
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-border p-5">
          <h2 className="text-xl font-semibold text-foreground">
            Edit Product
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
              description
            </label>
            <textarea
              rows={7}
              placeholder="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              price
            </label>
            <input
              type="number"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              stock
            </label>
            <input
              type="number"
              placeholder="stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              image
            </label>
            <input
              type="text"
              placeholder="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              categoryId
            </label>
            <input
              type="number"
              placeholder="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="sticky bottom-0 w-full rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
