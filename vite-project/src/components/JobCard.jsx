// src/components/JobCard.jsx

const MatchRing = ({ score }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#4ADE80" : score >= 40 ? "#E8A33D" : "#8B93A7";

  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg className="w-12 h-12 -rotate-90">
        <circle cx="24" cy="24" r={radius} stroke="#2A3555" strokeWidth="4" fill="none" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-mono font-semibold text-offwhite">
        {score}
      </span>
    </div>
  );
};

const statusConfig = {
  matched: { label: "New match", color: "text-slate bg-white/5" },
  materials_ready: { label: "Materials ready", color: "text-amber bg-amber/10" },
  applied: { label: "Applied", color: "text-success bg-success/10" },
};

const JobCard = ({ job, application, onGenerate, onOpen, generating }) => {
  const status = statusConfig[application?.status || "matched"];

  return (
    <div className="bg-ink-light border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <MatchRing score={job.matchScore ?? 0} />
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-offwhite truncate">{job.title}</h3>
            <p className="text-sm text-slate truncate">{job.companyName}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skillsRequired?.slice(0, 4).map((skill) => (
          <span key={skill} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate font-mono">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate mb-4 font-mono">
        <span>{job.location || "Remote"}</span>
        {job.isRemote && <span className="text-amber">Remote</span>}
      </div>

      {application?.status === "matched" || !application ? (
        <button
          onClick={() => onGenerate(job._id)}
          disabled={generating}
          className="w-full py-2 rounded-lg bg-amber text-ink text-sm font-medium hover:bg-amber/90 transition-colors disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate materials"}
        </button>
      ) : (
        <button
          onClick={() => onOpen(application)}
          className="w-full py-2 rounded-lg border border-white/10 text-offwhite text-sm font-medium hover:border-amber/50 transition-colors"
        >
          View materials
        </button>
      )}
    </div>
  );
};

export default JobCard;