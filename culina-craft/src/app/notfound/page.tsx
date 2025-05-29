"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center bg-[#88A187] px-4">
      <div className="text-center">
        <Image src="/maskotcc.png" alt="Mascot" width={120} height={120} className="mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <p className="text-lg text-[#F5D287] mb-6">Oops! Page not found.</p>

      </div>
    </div>
  );
}
