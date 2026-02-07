"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-semibold text-lg">
          Admin Panel
        </Link>

        <Link
          href="/queries"
          className="text-sm text-gray-600 hover:text-black"
        >
          Submissions
        </Link>
        <Link
          href="/support"
          className="text-sm text-gray-600 hover:text-black"
        >
          Support Ticket
        </Link>
        <Link
          href="/subscriptions"
          className="text-sm text-gray-600 hover:text-black"
        >
          Newsletter Subscriptions
        </Link>
        <Link
          href="/admin-users"
          className="text-sm text-gray-600 hover:text-black"
        >
          Admin Users
        </Link>
        <Link
          href="/portal-users"
          className="text-sm text-gray-600 hover:text-black"
        >
          Portal Users
        </Link>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="cursor-pointer text-sm bg-black text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
