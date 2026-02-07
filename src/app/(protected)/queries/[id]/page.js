import Link from "next/link";

async function getSubmission(id) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forms/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch submission");
  }

  return res.json();
}

export default async function SubmissionDetail({ params }) {
  const { id } = await params;
  const data = await getSubmission(id);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link href="/queries" className="text-sm text-blue-600 hover:underline">
        ← Back to submissions
      </Link>

      <h1 className="text-2xl font-semibold mt-4 mb-6">
        Full Submission Details
      </h1>

      <Section title="Basic Information">
        <Item label="Full Name" value={data.fullName} />
        <Item label="Email" value={data.email} />
        <Item label="Phone" value={data.phone} />
        <Item label="Organization" value={data.organization} />
        <Item label="Client Category" value={data.clientCategory} />
      </Section>

      <Section title="Services & Purpose">
        <Item label="Services" value={data.services?.join(", ")} />
        <Item label="Enquiry Purpose" value={data.enquiryPurpose} />
        <Item label="Current Stage" value={data.currentStage} />
      </Section>

      <Section title="Jurisdiction & Timeline">
        <Item label="Jurisdiction" value={data.jurisdiction?.join(", ")} />
        <Item label="Timeline" value={data.timeline} />
      </Section>

      <Section title="Background">
        <Item label="Previous IP" value={data.previousIP} />
        <Item label="How they heard about us" value={data.source} />
        <Item label="Preferred Communication" value={data.communication?.join(", ")} />
      </Section>

      <Section title="Consent">
        <Consent label="No confidential info shared" value={data.consent?.noConfidentialInfo} />
        <Consent label="No professional relationship" value={data.consent?.noRelationship} />
        <Consent label="Contact consent" value={data.consent?.contactConsent} />
      </Section>

      <p className="text-sm text-gray-500 mt-6">
        Submitted on{" "}
        {new Date(data.createdAt).toLocaleString()}
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

function Consent({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase text-gray-500">{label}</span>
      <span>{value ? "✅ Yes" : "❌ No"}</span>
    </div>
  );
}
