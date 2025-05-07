'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' } ,
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.error || 'Something went wrong');
      setSuccessMsg('');
    } else {
      setSuccessMsg(data.message);
      setErrorMsg('');
      // Redirect ke login setelah delay singkat
      setTimeout(() => router.push('/login'), 1500);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center flex-col">
        <img src="/maskotcc.png" alt="Mascot" className="w-40 h-40 mb-4" />
        <h1 className="text-4xl font-semibold">
          <span className="text-[#F5D287]">Culina</span>
          <span className="text-black">Craft</span>
        </h1>
      </div>

      <div className="w-1/2 bg-[#88A187] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-[#F5D287] mb-6 text-center">Register</h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="text-[#F5D287] text-sm mb-1 block">Username:</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg outline-none"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[#F5D287] text-sm mb-1 block">Email:</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[#F5D287] text-sm mb-1 block">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#DD6840] text-white font-semibold py-2 rounded-lg mt-2 hover:bg-[#c95c35] transition"
            >
              Register
            </button>

            {errorMsg && <p className="text-red-200 text-sm text-center">{errorMsg}</p>}
            {successMsg && <p className="text-green-200 text-sm text-center">{successMsg}</p>}

            <p className="text-sm text-white text-center mt-2">
              Already have an account?{" "}
              <Link href="/login" className="underline text-[#dcebd8]">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
