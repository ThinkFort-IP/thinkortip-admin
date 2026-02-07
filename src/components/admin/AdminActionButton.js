"use client";

import { toast } from "react-toastify";

export function AdminActionButton({
  id,
  endpoint,
  confirmMessage,
  successMessage,
  errorMessage,
  method = "DELETE",
  label = "Delete",
  className = "text-red-600 hover:underline text-sm",
  reload = true,
}) {
  const handleAction = async () => {
    const confirmed = confirm(confirmMessage);
    if (!confirmed) return;

    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method,
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success(successMessage);

      if (reload) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      toast.error(errorMessage);
    }
  };

  return (
    <button onClick={handleAction} className={className}>
      {label}
    </button>
  );
}
