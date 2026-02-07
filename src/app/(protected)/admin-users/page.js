import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import { AdminActionButton } from "@/components/admin/AdminActionButton";

async function getAdminUsers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/admin-list`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch admin users");
  }

  return res.json();
}

export default async function Page() {
  const adminUsers = await getAdminUsers();
  const session = await getServerSession(authOptions);
  const isSuperAdmin = session?.user.role === "superadmin";
  return (
    <>
      <ToastContainer />
      <div className="mt-35 mb-20 p-8">
        <h1 className="text-2xl font-semibold mb-6">Admin Users</h1>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                {isSuperAdmin && <th className="p-3">Delete</th>}
              </tr>
            </thead>

            <tbody>
              {adminUsers.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.role}</td>
                  {isSuperAdmin && item.role !== 'superadmin' && (
                    <td className="p-3">
                      <AdminActionButton
                        id={item._id}
                        endpoint="/api/users/admin-list/delete"
                        confirmMessage="Are you sure you want to delete this Admin user?"
                        successMessage="Admin user deleted successfully"
                        errorMessage="Failed to Admin user ticket"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {adminUsers.length === 0 && (
          <p className="text-gray-500 mt-6">No Admin users yet.</p>
        )}
      </div>
    </>
  );
}
