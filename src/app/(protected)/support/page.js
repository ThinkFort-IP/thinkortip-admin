import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ToastContainer } from "react-toastify";
import { AdminActionButton } from "@/components/admin/AdminActionButton";

async function getTickets() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/support/list`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch support tickets");
  }

  return res.json();
}

export default async function Page() {
  const tickets = await getTickets();
  const session = await getServerSession(authOptions);
  const isSuperAdmin = session?.user.role === "superadmin";

  return (
    <>
      <ToastContainer />
      <div className="mt-35 mb-20 p-8">
        <h1 className="text-2xl font-semibold mb-6">Support Queries</h1>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submitted</th>
                <th className="p-3">View</th>
                {isSuperAdmin && <th className="p-3">Delete</th>}
              </tr>
            </thead>

            <tbody>
              {tickets.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === "open"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/support/${item._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                  {isSuperAdmin && (
                    <td className="p-3">
                      <AdminActionButton
                        id={item._id}
                        endpoint="/api/support/delete"
                        confirmMessage="Are you sure you want to delete this ticket?"
                        successMessage="Ticket deleted successfully"
                        errorMessage="Failed to delete ticket"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tickets.length === 0 && (
          <p className="text-gray-500 mt-6">No support tickets yet.</p>
        )}
      </div>
    </>
  );
}
