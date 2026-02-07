import { connectToDB } from "@/app/lib/db";

export async function GET() {
  try {
    const db = await connectToDB();
    const admins = await db.collection("admins").find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(admins), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
