import { connectToDB } from "@/app/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID" }), {
        status: 400,
      });
    }

    const db = await connectToDB();
    const submission = await db
      .collection("queries")
      .findOne({ _id: new ObjectId(id) });

    if (!submission) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(submission), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
