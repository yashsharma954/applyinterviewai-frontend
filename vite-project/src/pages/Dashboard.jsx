// src/pages/Dashboard.jsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import ApplicationModal from "../components/ApplicationModal";

const TABS = [
  { key: "all", label: "All matches" },
  { key: "materials_ready", label: "Materials ready" },
  { key: "applied", label: "Applied" },
];

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [generatingId, setGeneratingId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState("");

  const applicationForJob = useCallback(
    (jobId) => applications.find((a) => a.job?._id === jobId || a.job === jobId),
    [applications]
  );

  const loadData = async () => {
    setError("");
    try {
      const [jobsRes, appsRes] = await Promise.all([
        api.get("/job/matched"),
        api.get("/application/my-applications"),
      ]);
      setJobs(jobsRes.data.data);
      setApplications(appsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Data load nahi ho payi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefreshJobs = async () => {
    setRefreshing(true);
    setError("");
    try {
      await api.post("/job/refresh");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Jobs refresh nahi ho payi");
    } finally {
      setRefreshing(false);
    }
  };

  const handleGenerate = async (jobId) => {
    setGeneratingId(jobId);
    setError("");
    try {
      const { data } = await api.post(`/application/generate/${jobId}`);
      setApplications((prev) => {
        const exists = prev.some((a) => a._id === data.data._id);
        return exists
          ? prev.map((a) => (a._id === data.data._id ? data.data : a))
          : [...prev, data.data];
      });
    } catch (err) {
      setError(err.response?.data?.message || "Materials generate nahi ho paye");
    } finally {
      setGeneratingId(null);
    }
  };

  const handleOpenModal = (application) => {
    const job = jobs.find((j) => j._id === (application.job?._id || application.job)) || application.job;
    setModalData({ application, job });
  };

  const handleMarkApplied = async (applicationId) => {
    try {
      const { data } = await api.patch(`/application/mark-applied/${applicationId}`);
      setApplications((prev) => prev.map((a) => (a._id === applicationId ? data.data : a)));
      setModalData((prev) => (prev ? { ...prev, application: data.data } : prev));
    } catch (err) {
      setError(err.response?.data?.message || "Status update nahi ho paya");
    }
  };

  const visibleJobs = jobs.filter((job) => {
    const app = applicationForJob(job._id);
    if (activeTab === "all") return true;
    return app?.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-offwhite">Your matches</h1>
            <p className="text-slate text-sm mt-1">
              {jobs.length} internships matched to your active resume
            </p>
          </div>
          <button
            onClick={handleRefreshJobs}
            disabled={refreshing}
            className="px-4 py-2 rounded-lg border border-white/10 text-sm text-offwhite hover:border-amber/50 transition-colors disabled:opacity-50"
          >
            {refreshing ? "Fetching new jobs..." : "Refresh jobs"}
          </button>
        </div>

        <div className="flex gap-1 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.key
                  ? "bg-amber/10 text-amber"
                  : "text-slate hover:text-offwhite"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
          </div>
        ) : visibleJobs.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate mb-1">No matches to show yet</p>
            <p className="text-sm text-slate/70">
              Upload a resume, set your preferences, then refresh jobs to see matches here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                application={applicationForJob(job._id)}
                onGenerate={handleGenerate}
                onOpen={handleOpenModal}
                generating={generatingId === job._id}
              />
            ))}
          </div>
        )}
      </div>

      <ApplicationModal
        application={modalData?.application}
        job={modalData?.job}
        onClose={() => setModalData(null)}
        onMarkApplied={handleMarkApplied}
      />
    </div>
  );
};

export default Dashboard;