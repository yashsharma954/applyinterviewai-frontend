// src/components/ApplicationModal.jsx
import { useState } from "react";

const CopyBlock = ({ label, text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate uppercase tracking-wide">{label}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate hover:text-amber transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="bg-ink rounded-lg p-3 text-sm text-offwhite/90 whitespace-pre-wrap border border-white/5">
        {text}
      </div>
    </div>
  );
};

const ApplicationModal = ({ application, job, onClose, onMarkApplied }) => {
  if (!application) return null;
  const m = application.generatedMaterials;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-ink-light rounded-2xl border border-white/10 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-ink-light border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-display font-semibold text-offwhite">{job?.title}</h2>
            <p className="text-sm text-slate">{job?.companyName}</p>
          </div>
          <button onClick={onClose} className="text-slate hover:text-offwhite text-xl leading-none">
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <span className="text-xs text-slate uppercase tracking-wide block mb-1.5">
              Resume bullet points
            </span>
            <ul className="bg-ink rounded-lg p-3 border border-white/5 space-y-1.5">
              {m?.resumePoints?.map((point, i) => (
                <li key={i} className="text-sm text-offwhite/90 flex gap-2">
                  <span className="text-amber">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <CopyBlock label="Cover letter" text={m?.coverLetter} />
          <CopyBlock label="Why this company" text={m?.whyCompany} />
          <CopyBlock label="LinkedIn connection message" text={m?.linkedinMessage} />

          <div className="flex gap-3 mt-6">
            <a
              href={job?.originalPostingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-lg border border-white/10 text-offwhite text-sm font-medium hover:border-amber/50 transition-colors"
            >
              Open original posting
            </a>
            {application.status !== "applied" ? (
              <button
                onClick={() => onMarkApplied(application._id)}
                className="flex-1 py-2.5 rounded-lg bg-amber text-ink text-sm font-medium hover:bg-amber/90 transition-colors"
              >
                Mark as applied
              </button>
            ) : (
              <span className="flex-1 text-center py-2.5 rounded-lg bg-success/10 text-success text-sm font-medium">
                Applied ✓
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;