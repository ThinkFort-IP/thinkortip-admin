import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminNavbar";
import Footer from "@/components/admin/Footer";

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
      {children}
      <Footer />
    </div>
  );
}
