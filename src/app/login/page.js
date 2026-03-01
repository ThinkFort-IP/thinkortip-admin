"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // IMPORTANT
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    // Success
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border rounded-lg p-6 bg-white"
      >
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border px-3 py-2 pr-16 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
