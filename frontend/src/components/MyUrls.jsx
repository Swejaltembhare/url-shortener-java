import { useEffect, useState } from "react";
import {
  Copy,
  ExternalLink,
  RefreshCw,
  Check,
  Link2,
  BarChart3,
  X,
  MousePointerClick,
  Calendar,
  Clock,
  AlertCircle,
  Tag,
  ShieldAlert,
} from "lucide-react";
import api from "../services/api";

function MyUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState("");

  const [analytics, setAnalytics] = useState(null);
  const [selectedShortCode, setSelectedShortCode] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  const fetchUrls = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/urls");
      setUrls(response.data || []);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
      setError("Unable to sync your link records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const getShortUrl = (shortCode) => {
    return `http://localhost:8080/${shortCode}`;
  };

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleOpen = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAnalytics = async (shortCode) => {
    setSelectedShortCode(shortCode);
    setAnalyticsLoading(true);
    setAnalyticsError("");
    setAnalytics(null);

    try {
      const response = await api.get(`/analytics/${shortCode}`);
      setAnalytics(response.data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      if (err.response?.status === 403) {
        setAnalyticsError("Access restricted. You don't have permission for this URL.");
      } else {
        setAnalyticsError("Analytics data unavailable at the moment.");
      }
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const closeAnalytics = () => {
    setAnalytics(null);
    setSelectedShortCode(null);
    setAnalyticsError("");
  };

  const getStatus = (url) => {
    if (!url.active) {
      return {
        text: "Inactive",
        badge: "bg-rose-50 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
      };
    }

    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      return {
        text: "Expired",
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };
    }

    return {
      text: "Active",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500 animate-pulse",
    };
  };

  return (
    <section className="mt-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600">
              <Link2 className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Link Management
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Monitor redirect status, click performance, and destination aliases.
          </p>
        </div>

        <button
          onClick={fetchUrls}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 hover:text-emerald-600 active:scale-95 disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-emerald-600" : ""}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm text-rose-600">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <p>{error}</p>
        </div>
      )}

      {/* Skeleton Loading State */}
      {loading && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="h-4 w-48 rounded bg-slate-200"></div>
                <div className="h-5 w-16 rounded-full bg-slate-200"></div>
              </div>
              <div className="h-3 w-3/4 rounded bg-slate-100"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && urls.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Link2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-slate-900">No active links found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            Generate your first short link above to begin tracking clicks and managing redirects.
          </p>
        </div>
      )}

      {/* URL Cards List */}
      {!loading && urls.length > 0 && (
        <div className="space-y-3.5">
          {urls.map((url) => {
            const shortUrl = getShortUrl(url.shortCode);
            const status = getStatus(url);

            return (
              <div
                key={url.id}
                className="group relative rounded-xl border border-slate-200 bg-white p-4 sm:p-5 transition-all hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Link Details */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-base font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        {shortUrl}
                      </a>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${status.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`}></span>
                        {status.text}
                      </span>
                    </div>

                    <p className="truncate text-xs text-slate-500 hover:text-slate-700 transition-colors">
                      {url.originalUrl}
                    </p>
                  </div>

                  {/* Actions Group */}
                  <div className="flex items-center gap-2 shrink-0 border-t border-slate-100 pt-3 lg:border-0 lg:pt-0">
                    <button
                      onClick={() => handleCopy(shortUrl, url.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        copiedId === url.id
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {copiedId === url.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleOpen(shortUrl)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#059669] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#10B981] active:scale-95"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Visit</span>
                    </button>

                    <button
                      onClick={() => handleAnalytics(url.shortCode)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-800 transition-all hover:bg-teal-100"
                    >
                      <BarChart3 className="h-3.5 w-3.5 text-teal-600" />
                      <span>Analytics</span>
                    </button>
                  </div>
                </div>

                {/* Card Meta Details Footer */}
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(url.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {url.expiresAt
                        ? `Expires ${new Date(url.expiresAt).toLocaleDateString()}`
                        : "No Expiration"}
                    </span>
                  </div>

                  {url.customAlias && (
                    <div className="flex items-center gap-1 text-slate-600">
                      <Tag className="h-3 w-3 text-emerald-600" />
                      <span>Alias: {url.customAlias}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Analytics Modal Overlay */}
      {(analyticsLoading || analyticsError || analytics || selectedShortCode) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 border border-teal-200 text-teal-600">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Link Performance</h3>
                  {selectedShortCode && (
                    <p className="text-xs text-slate-500">/{selectedShortCode}</p>
                  )}
                </div>
              </div>

              <button
                onClick={closeAnalytics}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            {analyticsLoading && (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="mx-auto h-6 w-6 animate-spin text-emerald-600" />
                <p className="text-xs text-slate-500">Fetching Real-time Analytics...</p>
              </div>
            )}

            {!analyticsLoading && analyticsError && (
              <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-600">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{analyticsError}</span>
              </div>
            )}

            {!analyticsLoading && analytics && (
              <div className="space-y-5">
                {/* Metric Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                        <MousePointerClick className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Total Engagements</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {analytics.totalClicks}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Click Log Table */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Recent Click Logs
                  </h4>

                  {analytics.clickHistory.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-500">
                      No engagements recorded for this URL yet.
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50">
                      <table className="w-full text-left text-xs">
                        <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 text-slate-600">
                          <tr>
                            <th className="px-3 py-2.5 font-medium">Timestamp</th>
                            <th className="px-3 py-2.5 font-medium">IP Address</th>
                            <th className="px-3 py-2.5 font-medium">User Agent</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {analytics.clickHistory.map((click) => (
                            <tr key={click.id} className="hover:bg-white">
                              <td className="px-3 py-2.5 text-slate-700 whitespace-nowrap">
                                {new Date(click.clickedAt).toLocaleString()}
                              </td>
                              <td className="px-3 py-2.5 text-teal-700 font-mono text-[11px]">
                                {click.ipAddress || "—"}
                              </td>
                              <td className="px-3 py-2.5 text-slate-600 max-w-xs truncate">
                                {click.userAgent || "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default MyUrls;