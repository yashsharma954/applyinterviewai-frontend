// src/pages/ResumeUpload.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import Navbar from "../components/Navbar";

const ResumeUpload = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const loadResumes = async () => {
    try {
      const { data } = await api.get("/resume/my-resumes");
      setResumes(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Resumes load nahi ho paye");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const uploadFile = async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Sirf PDF files allowed hain");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumes((prev) => [data.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Upload fail ho gaya");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    uploadFile(e.dataTransfer.files?.[0]);
  };

  const setActive = async (resumeId) => {
    try {
      const { data } = await api.patch(`/resume/set-active/${resumeId}`);
      setResumes((prev) =>
        prev.map((r) => ({ ...r, _isActive: r._id === data.data._id }))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Active resume set nahi hua");
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      await api.delete(`/resume/${resumeId}`);
      setResumes((prev) => prev.filter((r) => r._id !== resumeId));
    } catch (err) {
      setError(err.response?.data?.message || "Delete nahi ho paya");
    }
  };

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-display text-2xl font-semibold text-offwhite mb-1">Resumes</h1>
        <p className="text-slate text-sm mb-8">
          Upload a resume and let ApplyAI read your skills, projects and experience.
        </p>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Upload dropzone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors mb-10 ${
            dragActive ? "border-amber bg-amber/5" : "border-white/10 hover:border-white/20"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => uploadFile(e.target.files?.[0])}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate">Reading and parsing your resume...</p>
            </div>
          ) : (
            <>
              <p className="text-offwhite font-medium mb-1">Drop your resume here, or click to browse</p>
              <p className="text-sm text-slate">PDF only, up to 5MB</p>
            </>
          )}
        </div>

        {/* Resume list */}
        <h2 className="text-sm text-slate uppercase tracking-wide mb-3">Your resumes</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-amber border-t-transparent rounded-full animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate text-sm">No resume uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-ink-light border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-offwhite text-sm font-medium truncate">
                      Resume · {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                    {resume._isActive && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.parsedData?.skills?.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActive(resume._id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-offwhite hover:border-amber/50 transition-colors"
                  >
                    Set active
                  </button>
                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="text-xs px-3 py-1.5 rounded-lg text-slate hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => navigate("/preferences")}
            className="px-5 py-2.5 rounded-lg bg-amber text-ink text-sm font-medium hover:bg-amber/90 transition-colors"
          >
            Next: Set preferences →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;