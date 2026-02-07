import { connectToDB } from "@/app/lib/db";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    /* 1️⃣ Validate ID */
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid ticket ID" }),
        { status: 400 }
      );
    }

    /* 2️⃣ DB query */
    const db = await connectToDB();
    const ticket = await db
      .collection("support_tickets")
      .findOne({ _id: new ObjectId(id) });

    /* 3️⃣ Not found */
    if (!ticket) {
      return new Response(
        JSON.stringify({ message: "Support ticket not found" }),
        { status: 404 }
      );
    }

    /* 4️⃣ Success */
    return new Response(JSON.stringify(ticket), { status: 200 });

  } catch (error) {
    console.error("GET support ticket error:", error);

    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}
