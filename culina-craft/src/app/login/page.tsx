// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/"); // arahkan ke halaman setelah login
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Logo) */}
      <div className="w-1/2 bg-white flex items-center justify-center flex-col">
        <img src="/maskotcc.png" alt="Mascot" className="w-40 h-40 mb-4" />
        <h1 className="text-4xl font-semibold">
          <span className="text-[#F5D287]">Culina</span>
          <span className="text-black">Craft</span>
        </h1>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 bg-[#88A187] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-[#F5D287] mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-[#F5D287] text-sm mb-1 block">Email:</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[#F5D287] text-sm mb-1 block">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#DD6840] text-white font-semibold py-2 rounded-lg mt-2 hover:bg-[#c95c35] transition"
            >
              Login
            </button>
            <p className="text-sm text-white text-center mt-2">
              Doesn’t have any account?{" "}
              <Link href="/register" className="underline text-[#dcebd8]">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
