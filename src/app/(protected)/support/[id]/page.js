import Link from "next/link";

async function getTicket(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/support/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ticket");
  }

  return res.json();
}

export default async function SupportTicketDetail({ params }) {
  const { id } = await params;
  const data = await getTicket(id);

  return (
    <div className="mt-15 p-8 max-w-4xl mx-auto">
      <Link
        href="/support"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to support tickets
      </Link>

      <h1 className="text-2xl font-semibold mt-4 mb-6">
        Support Ticket Details
      </h1>

      <Section title="User Information">
        <Item label="Full Name" value={data.fullName} />
        <Item label="Email" value={data.email} />
        <Item label="Status" value={data.status} />
      </Section>

      <Section title="Message">
        <div className="md:col-span-2">
          <p className="text-xs uppercase text-gray-500 mb-1">Message</p>
          <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
            {data.message}
          </div>
        </div>
      </Section>

      <Section title="Metadata">
        <Item label="User Agent" value={data.userAgent} />
        <Item label="Page URL" value={data.pageUrl} />
      </Section>

      <p className="text-sm text-gray-500 mt-6">
        Submitted on {new Date(data.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border rounded-lg p-6 mb-6 bg-white">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value || "-"}</p>
    </div>
  );
}
