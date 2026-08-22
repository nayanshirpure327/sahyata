"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/explore");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D16] p-4 relative overflow-hidden text-white">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#0EA5E9]/25 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 rounded-3xl space-y-6 relative z-10 border border-white/15 shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#38BDF8] hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#0EA5E9] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#0EA5E9]/40">
            S
          </div>
          <h1 className="text-2xl font-black">Create Your Account</h1>
          <p className="text-xs text-slate-400">
            Join thousands of newcomers settling down in their new city with Sahayta
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Full Name</label>
            <input
              type="text"
              required
              placeholder="Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white focus:outline-none focus:border-[#0EA5E9]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Email Address</label>
            <input
              type="email"
              required
              placeholder="rahul@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white focus:outline-none focus:border-[#0EA5E9]"
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
              className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white focus:outline-none focus:border-[#0EA5E9]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#0EA5E9]/30 transition btn-tactile"
          >
            Create Account
          </button>
        </form>

        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#38BDF8] font-bold hover:text-white">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
