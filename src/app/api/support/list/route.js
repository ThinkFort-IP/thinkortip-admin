import { connectToDB } from "@/app/lib/db";

export const runtime = "nodejs";

export async function GET() {

  const db = await connectToDB();

  const tickets = await db
    .collection("support_tickets")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(tickets);
}
