import { Link } from "react-router-dom";
import { ArrowRight, Link2, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-800">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-900 leading-[1.15]">
            Shorten Your Links. <br />
            <span className="text-[#059669]">Share Them Easily.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Create compact links, configure custom aliases, and track click metrics in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#10B981] active:scale-95 w-full sm:w-auto"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 w-full sm:w-auto shadow-sm"
            >
              <span>Log In</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="w-full px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Link2 className="h-3 w-3" />
            </div>
            <span className="font-medium text-slate-800">URL Shortener</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;