// src/pages/Preferences.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import Navbar from "../components/Navbar";

const ROLE_SUGGESTIONS = [
  "Full Stack Developer", "Frontend Developer", "Backend Developer",
  "Data Analyst", "UI/UX Designer", "DevOps Engineer",
];

const Preferences = () => {
  const [roles, setRoles] = useState([]);
  const [roleInput, setRoleInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minStipend, setMinStipend] = useState(0);
  const [jobType, setJobType] = useState("internship");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/preference");
        setRoles(data.data.roles || []);
        setLocations(data.data.locations || []);
        setRemoteOnly(data.data.remoteOnly || false);
        setMinStipend(data.data.minStipend || 0);
        setJobType(data.data.jobType || "internship");
      } catch {
        // preference not set yet — normal for new users
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addTag = (value, list, setList, setInput) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
    setInput("");
  };

  const removeTag = (value, list, setList) => {
    setList(list.filter((item) => item !== value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roles.length === 0) {
      setError("Kam se kam ek role add karo");
      return;
    }
    setError("");
    setSaving(true);
    setSaved(false);
    try {
      await api.post("/preference", { roles, locations, remoteOnly, minStipend, jobType });
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || "Preference save nahi hui");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-display text-2xl font-semibold text-offwhite mb-1">Preferences</h1>
        <p className="text-slate text-sm mb-8">
          Tell ApplyAI what you're looking for — it'll filter and score matches accordingly.
        </p>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        {saved && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm">
            Preferences saved
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-ink-light border border-white/5 rounded-2xl p-6 space-y-6">
          {/* Roles */}
          <div>
            <label className="block text-sm text-offwhite mb-2">Roles you're targeting</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="text-xs px-3 py-1.5 rounded-full bg-amber/10 text-amber flex items-center gap-1.5"
                >
                  {role}
                  <button type="button" onClick={() => removeTag(role, roles, setRoles)} className="hover:text-red-400">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(roleInput, roles, setRoles, setRoleInput);
                }
              }}
              placeholder="Type a role and press Enter"
              className="w-full px-3 py-2.5 rounded-lg bg-ink border border-white/10 text-offwhite text-sm focus:border-amber outline-none transition-colors"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {ROLE_SUGGESTIONS.filter((s) => !roles.includes(s)).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRoles([...roles, s])}
                  className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate hover:text-offwhite transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-sm text-offwhite mb-2">Preferred locations</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-offwhite flex items-center gap-1.5"
                >
                  {loc}
                  <button type="button" onClick={() => removeTag(loc, locations, setLocations)} className="hover:text-red-400">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(locationInput, locations, setLocations, setLocationInput);
                }
              }}
              placeholder="e.g. Bangalore, Remote — press Enter"
              disabled={remoteOnly}
              className="w-full px-3 py-2.5 rounded-lg bg-ink border border-white/10 text-offwhite text-sm focus:border-amber outline-none transition-colors disabled:opacity-40"
            />
          </div>

          {/* Remote only */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="w-4 h-4 accent-amber"
            />
            <span className="text-sm text-offwhite">Remote roles only</span>
          </label>

          {/* Min stipend */}
          <div>
            <label className="block text-sm text-offwhite mb-2">
              Minimum stipend <span className="text-slate font-mono">₹{minStipend}</span>
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={minStipend}
              onChange={(e) => setMinStipend(Number(e.target.value))}
              className="w-full accent-amber"
            />
          </div>

          {/* Job type */}
          <div>
            <label className="block text-sm text-offwhite mb-2">Job type</label>
            <div className="flex gap-2">
              {["internship", "full-time", "both"].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setJobType(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                    jobType === type ? "bg-amber/10 text-amber" : "bg-white/5 text-slate hover:text-offwhite"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-lg bg-amber text-ink text-sm font-medium hover:bg-amber/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save preferences"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-slate hover:text-amber transition-colors"
          >
            ← Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;