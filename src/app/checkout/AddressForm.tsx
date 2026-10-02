"use client";

import { DOMAIN } from "@/utils/constants";
import { CartResponse } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import OrderSummary from "./OrderSummary";

type AddressFormProps = {
  cart: CartResponse;
};

const AddressForm = ({ cart }: AddressFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");
    try {
      await axios.post(`${DOMAIN}/api/orders`, formData);
      toast.success("Order placed successfully");
      router.push("/orders");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm max-w-3xl m-auto">
      <h2 className="mb-6 text-xl font-semibold">Shipping Address</h2>

      <form onSubmit={formSubmitHandler} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fullName: e.target.value,
              }))
            }
            className="rounded-lg border border-border bg-background px-4 py-2.5 outline-none transition focus:border-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="rounded-lg border border-border bg-background px-4 py-2.5 outline-none transition focus:border-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <input
            type="text"
            placeholder="Enter your country"
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                country: e.target.value,
              }))
            }
            className="rounded-lg border border-border bg-background px-4 py-2.5 outline-none transition focus:border-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <input
            type="text"
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            className="rounded-lg border border-border bg-background px-4 py-2.5 outline-none transition focus:border-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            className="rounded-lg border border-border bg-background px-4 py-2.5 outline-none transition focus:border-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="postalCode" className="text-sm font-medium">
            Postal Code
          </label>
          <input
            type="text"
            placeholder="Enter your postal code"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                postalCode: e.target.value,
              }))
            }
            className="rounded-lg border border-border bg-background px-4 py-2.5 outline-none transition focus:border-foreground"
          />
        </div>

        <OrderSummary cart={cart} />

        <button
          type="submit"
          className="w-full rounded-lg bg-foreground px-4 py-3 font-medium text-background transition hover:opacity-80"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
