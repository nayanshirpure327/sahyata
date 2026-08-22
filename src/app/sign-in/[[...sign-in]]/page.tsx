"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/explore");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D16] p-4 relative overflow-hidden text-white">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 rounded-3xl space-y-6 relative z-10 border border-white/15 shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#38BDF8] hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#2563EB]/40">
            S
          </div>
          <h1 className="text-2xl font-black">Sign In to Sahayta</h1>
          <p className="text-xs text-slate-400">
            Connect with verified PGs, tiffins, and flatmates in your city
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Email Address</label>
            <input
              type="email"
              required
              placeholder="rahul@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#2563EB]/30 transition btn-tactile"
          >
            Sign In
          </button>
        </form>

        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#38BDF8] font-bold hover:text-white">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
