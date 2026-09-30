import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import MyUrls from "../components/MyUrls";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Container */}
      <main className="w-full px-4 sm:px-6 lg:px-12 py-8">
        {/* Simplified Header */}
        <div className="mb-6 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Create, manage, and track your shortened URLs.
          </p>
        </div>

        <div className="mb-8">
          <UrlForm />
        </div>

        <MyUrls />
      </main>
    </div>
  );
}

export default Dashboard;