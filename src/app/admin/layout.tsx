import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaPlusCircle, FaBox, FaTags, FaShoppingCart } from "react-icons/fa";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();
  //   const token = (cookieStore.get("jwtToken")?.value as string) || "";
  //   const payload = verifyTokenForPage(token);
  //   if(payload?.isAdmin === false){
  //     redirect("/")
  //   }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full shrink-0 border-b border-border bg-card p-3 md:w-56 md:border-r md:border-b-0 md:p-5 lg:w-64">
        <h2 className="mb-3 text-lg font-bold text-foreground md:mb-8 md:text-xl">
          Admin Panel
        </h2>

        <nav className="flex flex-wrap gap-2 md:flex-col md:gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-muted/20 sm:gap-3 sm:p-3 md:text-base"
          >
            <FaPlusCircle size={18} className="shrink-0" />
            <span>Create Product</span>
          </Link>

          <Link
            href="/admin/manage-products"
            className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-muted/20 sm:gap-3 sm:p-3 md:text-base"
          >
            <FaBox size={18} className="shrink-0" />
            <span>Manage Products</span>
          </Link>

          <Link
            href="/admin/manage-categories"
            className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-muted/20 sm:gap-3 sm:p-3 md:text-base"
          >
            <FaTags size={18} className="shrink-0" />
            <span>Categories</span>
          </Link>

          <Link
            href="/admin/manage-orders"
            className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-muted/20 sm:gap-3 sm:p-3 md:text-base"
          >
            <FaShoppingCart size={18} className="shrink-0" />
            <span>Orders</span>
          </Link>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-3 sm:p-5 md:p-6">{children}</main>
    </div>
  );
}
