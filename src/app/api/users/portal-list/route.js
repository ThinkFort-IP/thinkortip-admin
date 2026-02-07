import { connectToDB } from "@/app/lib/db";

export async function GET() {
  try {
    const db = await connectToDB();
    const portalUsers = await db.collection("portal-users").find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(portalUsers), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
