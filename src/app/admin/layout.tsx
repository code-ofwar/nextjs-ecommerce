import Link from "next/link";
import { FaPlusCircle, FaBox, FaTags, FaShoppingCart } from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-border bg-card p-5">
        <h2 className="mb-8 text-xl font-bold text-foreground">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted/20"
          >
            <FaPlusCircle size={18} />
            <span>Create Product</span>
          </Link>

          <Link
            href="/admin/manage-products"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted/20"
          >
            <FaBox size={18} />
            <span>Manage Products</span>
          </Link>

          <Link
            href="/admin/manage-categories"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted/20"
          >
            <FaTags size={18} />
            <span>Categories</span>
          </Link>

          <Link
            href="/admin/manage-orders"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted/20"
          >
            <FaShoppingCart size={18} />
            <span>Orders</span>
          </Link>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-6">{children}</main>
    </div>
  );
}
