// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Link2,
//   LogIn,
//   UserPlus,
//   LogOut,
//   LayoutDashboard,
//   ArrowRight,
//   Menu,
//   X,
//   Home as HomeIcon,
// } from "lucide-react";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setMobileMenuOpen(false);
//     navigate("/login");
//   };

//   const isDashboard = location.pathname === "/dashboard";
//   const isHome = location.pathname === "/";

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md">
      
//       {/* ================= NAVBAR ================= */}
//       <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-12">

//         {/* ================= LOGO / BRAND ================= */}
//         <Link
//           to="/"
//           onClick={() => setMobileMenuOpen(false)}
//           className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
//         >
//           {/* Logo Icon */}
//           <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/20">
//             <Link2 className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
//           </div>

//           {/* Project Name */}
//           <div className="flex items-center gap-1.5">
//             <span className="text-lg font-bold tracking-tight text-[#F8FAFC]">
//               Link
//             </span>

//             <span className="text-lg font-bold tracking-tight text-emerald-400">
//               Shortener
//             </span>
//           </div>
//         </Link>

//         {/* ================= DESKTOP NAVBAR ================= */}
//         <div className="hidden items-center gap-3 md:flex">

//           {token ? (
//             <div className="flex items-center gap-3">

//               {/* HOME */}
//               {!isHome && (
//                 <Link
//                   to="/"
//                   className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
//                 >
//                   <HomeIcon className="h-4 w-4 text-slate-400" />
//                   <span>Home</span>
//                 </Link>
//               )}

//               {/* DASHBOARD */}
//               <Link
//                 to="/dashboard"
//                 className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
//                   isDashboard
//                     ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
//                     : "border border-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
//                 }`}
//               >
//                 <LayoutDashboard
//                   className={`h-4 w-4 ${
//                     isDashboard
//                       ? "text-emerald-400"
//                       : "text-slate-400"
//                   }`}
//                 />

//                 <span>Dashboard</span>
//               </Link>

//               {/* DIVIDER */}
//               <div className="mx-1 h-5 w-px bg-slate-800" />

//               {/* SIGN OUT */}
//               <button
//                 onClick={handleLogout}
//                 className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3.5 py-2 text-sm font-medium text-slate-200 transition-all hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400 active:scale-95"
//               >
//                 <LogOut className="h-4 w-4" />

//                 <span>Sign Out</span>
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">

//               {/* LOGIN */}
//               <Link
//                 to="/login"
//                 className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
//               >
//                 <LogIn className="h-4 w-4 text-slate-400" />

//                 <span>Log In</span>
//               </Link>

//               {/* GET STARTED */}
//               <Link
//                 to="/register"
//                 className="group inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-500 active:scale-95"
//               >
//                 <UserPlus className="h-4 w-4" />

//                 <span>Get Started</span>

//                 <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* ================= MOBILE MENU BUTTON ================= */}
//         <div className="flex items-center md:hidden">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
//             aria-label="Toggle navigation menu"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6 text-emerald-400" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       {mobileMenuOpen && (
//         <div className="w-full border-t border-slate-800 bg-[#0F172A] px-4 py-4 md:hidden">

//           {token ? (
//             <div className="flex flex-col gap-2">

//               {/* MOBILE HOME */}
//               <Link
//                 to="/"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
//               >
//                 <HomeIcon className="h-4 w-4 text-emerald-400" />

//                 <span>Home</span>
//               </Link>

//               {/* MOBILE DASHBOARD */}
//               <Link
//                 to="/dashboard"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
//                   isDashboard
//                     ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
//                     : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                 }`}
//               >
//                 <LayoutDashboard className="h-4 w-4 text-emerald-400" />

//                 <span>Dashboard</span>
//               </Link>

//               {/* DIVIDER */}
//               <div className="my-1 border-t border-slate-800" />

//               {/* MOBILE SIGN OUT */}
//               <button
//                 onClick={handleLogout}
//                 className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
//               >
//                 <LogOut className="h-4 w-4" />

//                 <span>Sign Out</span>
//               </button>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2.5">

//               {/* MOBILE LOGIN */}
//               <Link
//                 to="/login"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/50 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
//               >
//                 <LogIn className="h-4 w-4 text-slate-400" />

//                 <span>Log In</span>
//               </Link>

//               {/* MOBILE GET STARTED */}
//               <Link
//                 to="/register"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
//               >
//                 <UserPlus className="h-4 w-4" />

//                 <span>Get Started</span>
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Link2,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  ArrowRight,
  Menu,
  X,
  Home as HomeIcon,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const isDashboard = location.pathname === "/dashboard";
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-12 flex h-16 items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
            <Link2 className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Shortify
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              PRO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <div className="flex items-center gap-3">
              {!isHome && (
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <HomeIcon className="h-3.5 w-3.5 text-slate-500" />
                  <span>Home</span>
                </Link>
              )}

              <Link
                to="/dashboard"
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isDashboard
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
                }`}
              >
                <LayoutDashboard
                  className={`h-3.5 w-3.5 ${
                    isDashboard ? "text-emerald-600" : "text-slate-500"
                  }`}
                />
                <span>Dashboard</span>
              </Link>

              <div className="h-4 w-[1px] bg-slate-200 mx-1" />

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <LogIn className="h-3.5 w-3.5 text-slate-500" />
                <span>Log In</span>
              </Link>

              <Link
                to="/register"
                className="group relative inline-flex items-center gap-1.5 rounded-lg bg-[#059669] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#10B981] active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-emerald-600" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          {token ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <HomeIcon className="h-4 w-4 text-emerald-600" />
                <span>Home</span>
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${
                  isDashboard
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <LayoutDashboard className="h-4 w-4 text-emerald-600" />
                <span>Dashboard</span>
              </Link>

              <div className="my-1 border-t border-slate-200" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <LogIn className="h-4 w-4 text-slate-500" />
                <span>Log In</span>
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#059669] py-2.5 text-sm font-semibold text-white hover:bg-[#10B981]"
              >
                <UserPlus className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;