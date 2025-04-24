"use client";

import Link from "next/link";

export default function RegisterPage() {
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
          <form className="space-y-4">
            <div>
              <label className="text-[#F5D287] text-sm mb-1 block">Username:</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg outline-none"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-[#F5D287] text-sm mb-1 block">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#DD6840] text-white font-semibold py-2 rounded-lg mt-2 hover:bg-[#c95c35] transition"
            >
              Register
            </button>
            <p className="text-sm text-white text-center mt-2">
              Already have an account?{" "}
              <Link href="/register" className="underline text-[#dcebd8]">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
