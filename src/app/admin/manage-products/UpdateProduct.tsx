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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-4">
      <div className="flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            Edit Product
          </h2>

          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="shrink-0 cursor-pointer text-2xl text-muted transition-colors hover:text-foreground"
          />
        </div>

        <form
          onSubmit={formSubmitHandler}
          className="flex min-h-0 flex-col gap-3 overflow-y-auto p-4 sm:gap-4 sm:p-5"
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
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Stock
            </label>
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Image
            </label>
            <input
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category ID
            </label>
            <input
              type="number"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full shrink-0 rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:text-base"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
