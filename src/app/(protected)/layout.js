import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !["admin", "superadmin"].includes(session.user.role)
  ) {
    redirect("/login");
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="pt-16 px-6">{children}</main>
    </div>
  );
}
