import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/app/lib/db";

export const runtime = "nodejs";

export async function DELETE(req, { params }) {
  try {
    /* 1️⃣ Auth check */
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "superadmin") {
      return new Response(
        JSON.stringify({ message: "Forbidden" }),
        { status: 403 }
      );
    }

    /* 2️⃣ Validate ID */
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid ticket ID" }),
        { status: 400 }
      );
    }

    /* 3️⃣ DB operation */
    const db = await connectToDB();

    const result = await db
      .collection("support_tickets")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Support ticket not found" }),
        { status: 404 }
      );
    }

    /* 4️⃣ Success */
    return Response.json({
      success: true,
      deletedId: id,
    });

  } catch (error) {
    console.error("DELETE support ticket error:", error);

    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
