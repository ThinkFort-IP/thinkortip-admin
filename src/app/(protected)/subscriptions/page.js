import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import { AdminActionButton } from "@/components/admin/AdminActionButton";

async function getSubscriptions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscriptions/list`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch submissions");
  }

  return res.json();
}

export default async function Page() {
  const submissions = await getSubscriptions();
  const session = await getServerSession(authOptions);
  const isSuperAdmin = session?.user.role === "superadmin";
  return (
    <>
      <ToastContainer />
      <div className="mt-35 mb-20 p-8">
        <h1 className="text-2xl font-semibold mb-6">Subscriptions</h1>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Submitted</th>
                {isSuperAdmin && <th className="p-3">Delete</th>}
              </tr>
            </thead>

            <tbody>
              {submissions.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  {isSuperAdmin && (
                    <td className="p-3">
                      <AdminActionButton
                        id={item._id}
                        endpoint="/api/subscriptions/delete"
                        confirmMessage="Are you sure you want to delete this Subscription?"
                        successMessage="Subscription deleted successfully"
                        errorMessage="Failed to delete Subscription"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {submissions.length === 0 && (
          <p className="text-gray-500 mt-6">No Subscriptions yet.</p>
        )}
      </div>
    </>
  );
}
