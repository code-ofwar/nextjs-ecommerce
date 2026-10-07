"use client";

import { DOMAIN } from "@/utils/constants";
import { OrderStatus } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type UpdateStatusProps = {
  orderId: number;
  currentStatus: OrderStatus;
};

const UpdateStatus = ({ orderId, currentStatus }: UpdateStatusProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const updateStatusHandler = async (newStatus: OrderStatus) => {
    setStatus(newStatus);
    setLoading(true);

    try {
      await axios.put(`${DOMAIN}/api/orders/${orderId}`, {
        status: newStatus,
      });
      router.refresh();
      toast.success("Order status updated successfully");
    } catch (error) {
      setStatus(currentStatus);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to update order status",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor={`status-${orderId}`} className="text-sm font-medium">
        Change status:
      </label>

      <select
        id={`status-${orderId}`}
        value={status}
        disabled={loading}
        onChange={(e) => updateStatusHandler(e.target.value as OrderStatus)}
        className="w-32 rounded-md border border-border bg-card px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {Object.values(OrderStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UpdateStatus;
