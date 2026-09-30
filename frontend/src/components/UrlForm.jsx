import { useState } from "react";
import {
  Sparkles,
  CalendarClock,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Loader2,
  AlertCircle,
  Tag,
} from "lucide-react";
import api from "../services/api";

function UrlForm({ onUrlCreated }) {
  const [formData, setFormData] = useState({
    originalUrl: "",
    customAlias: "",
    expiresAt: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const payload = {
        originalUrl: formData.originalUrl,
      };

      if (formData.customAlias.trim()) {
        payload.customAlias = formData.customAlias.trim();
      }

      if (formData.expiresAt) {
        payload.expiresAt = formData.expiresAt;
      }

      const response = await api.post("/urls", payload);

      setResult(response.data);

      if (onUrlCreated && typeof onUrlCreated === "function") {
        onUrlCreated(response.data);
      }

      setFormData({
        originalUrl: "",
        customAlias: "",
        expiresAt: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to process request. Please check your URL."
      );
    } finally {
      setLoading(false);
    }
  };

  const shortUrl = result ? `http://localhost:8080/${result.shortCode}` : "";

  const copyUrl = async () => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Create Short Link
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Transform destination URLs into tracked short aliases.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination URL Field */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Destination URL <span className="text-emerald-600">*</span>
          </label>

          <div className="relative flex items-center">
            <Globe className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="url"
              name="originalUrl"
              value={formData.originalUrl}
              onChange={handleChange}
              placeholder="https://example.com/long-page-address"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Custom Alias & Expiration Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Custom Alias */}
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3 text-slate-400" /> Custom Alias
              </span>
              <span className="text-[10px] text-slate-400">Optional</span>
            </label>

            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs font-mono text-slate-400 select-none">
                /
              </span>
              <input
                type="text"
                name="customAlias"
                value={formData.customAlias}
                onChange={handleChange}
                placeholder="my-brand-link"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-7 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
          </div>

          {/* Expiration Date */}
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <CalendarClock className="h-3 w-3 text-slate-400" /> Expiration Date
              </span>
              <span className="text-[10px] text-slate-400">Optional</span>
            </label>

            <input
              type="datetime-local"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 [color-scheme:light]"
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-600">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#10B981] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Generating Short Code...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Shorten URL</span>
            </>
          )}
        </button>
      </form>

      {/* Generated Result Card */}
      {result && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Short Link Ready!
            </span>
            <span className="text-[10px] text-emerald-700 font-mono">200 OK</span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              value={shortUrl}
              readOnly
              className="flex-1 rounded-lg border border-emerald-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-mono text-emerald-900 outline-none select-all"
            />

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyUrl}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-all ${
                  copied
                    ? "border-emerald-300 bg-emerald-200 text-emerald-900"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#059669] px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-[#10B981]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Visit</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UrlForm;