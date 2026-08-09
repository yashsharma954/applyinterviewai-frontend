// // src/pages/Landing.jsx
// import { Link } from "react-router-dom";

// const steps = [
//   { num: "01", title: "Upload resume", desc: "ApplyAI reads your skills, projects and experience automatically." },
//   { num: "02", title: "Set preferences", desc: "Tell it the roles, locations and stipend you're looking for." },
//   { num: "03", title: "Get matched", desc: "It finds internships and scores each one against your profile." },
//   { num: "04", title: "Apply with materials ready", desc: "Tailored resume points, cover letter and outreach message — generated per job." },
// ];

// const Landing = () => {
//   return (
//     <div className="min-h-screen bg-ink text-offwhite">
//       {/* Nav */}
//       <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center">
//             <span className="text-ink font-display font-bold text-xs">A</span>
//           </div>
//           <span className="font-display font-semibold">ApplyAI</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <Link to="/login" className="text-sm text-slate hover:text-offwhite transition-colors">
//             Log in
//           </Link>
//           <Link
//             to="/register"
//             className="text-sm px-4 py-2 rounded-lg bg-amber text-ink font-medium hover:bg-amber/90 transition-colors"
//           >
//             Get started
//           </Link>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
//         <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate mb-8 font-mono">
//           <span className="w-1.5 h-1.5 rounded-full bg-success" />
//           Agent-powered internship applications
//         </span>

//         <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[1.1] mb-6">
//           Let the agent write your
//           <br />
//           <span className="text-amber">application</span>, you decide who to send it to.
//         </h1>

//         <p className="text-slate text-lg max-w-xl mx-auto mb-10">
//           Upload your resume once. ApplyAI matches you to internships and drafts a tailored
//           resume, cover letter and outreach message for every one — copy-ready.
//         </p>

//         <div className="flex items-center justify-center gap-3">
//           <Link
//             to="/register"
//             className="px-6 py-3 rounded-lg bg-amber text-ink font-medium hover:bg-amber/90 transition-colors"
//           >
//             Start matching →
//           </Link>
//           <Link
//             to="/login"
//             className="px-6 py-3 rounded-lg border border-white/10 text-offwhite font-medium hover:border-white/20 transition-colors"
//           >
//             I already have an account
//           </Link>
//         </div>
//       </section>

//       {/* Pipeline / Steps — signature element */}
//       <section className="max-w-6xl mx-auto px-6 pb-24">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {steps.map((step) => (
//             <div
//               key={step.num}
//               className="bg-ink-light border border-white/5 rounded-2xl p-6 hover:border-amber/30 transition-colors"
//             >
//               <span className="font-mono text-sm text-amber">{step.num}</span>
//               <h3 className="font-display font-semibold mt-3 mb-2">{step.title}</h3>
//               <p className="text-sm text-slate leading-relaxed">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* What it doesn't do — honesty builds trust */}
//       <section className="max-w-3xl mx-auto px-6 pb-24">
//         <div className="border border-white/5 rounded-2xl p-6 bg-ink-light/50">
//           <h3 className="font-display font-semibold mb-2">You stay in control</h3>
//           <p className="text-sm text-slate leading-relaxed">
//             ApplyAI never submits applications on its own. It prepares the materials — you
//             review, copy, and apply directly on the company's own posting.
//           </p>
//         </div>
//       </section>

//       <footer className="border-t border-white/5 py-8">
//         <p className="text-center text-xs text-slate font-mono">ApplyAI · built for internship season</p>
//       </footer>
//     </div>
//   );
// };

// export default Landing;

// src/pages/Landing.jsx
import { Link } from "react-router-dom";

const steps = [
  { num: "01", title: "Upload resume", desc: "ApplyAI reads your skills, projects and experience automatically." },
  { num: "02", title: "Set preferences", desc: "Tell it the roles, locations and stipend you're looking for." },
  { num: "03", title: "Get matched", desc: "It finds internships and scores each one against your profile." },
  { num: "04", title: "Apply with materials ready", desc: "Tailored resume points, cover letter and outreach — generated per job." },
];

const MockJobCard = () => (
  <div className="bg-ink-light border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/40">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 shrink-0">
          <svg className="w-11 h-11 -rotate-90">
            <circle cx="22" cy="22" r="18" stroke="#2A3555" strokeWidth="4" fill="none" />
            <circle
              cx="22" cy="22" r="18"
              stroke="#4ADE80" strokeWidth="4" fill="none"
              strokeDasharray={113} strokeDashoffset={12} strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-semibold text-offwhite">89</span>
        </div>
        <div>
          <p className="font-display font-semibold text-offwhite text-sm">Backend Developer Intern</p>
          <p className="text-xs text-slate">Rivet Systems</p>
        </div>
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-amber/10 text-amber whitespace-nowrap">Materials ready</span>
    </div>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {["node.js", "postgresql", "docker"].map((s) => (
        <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate font-mono">{s}</span>
      ))}
    </div>
    <div className="h-9 rounded-lg bg-amber/90 flex items-center justify-center">
      <span className="text-ink text-xs font-medium">View materials</span>
    </div>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-ink text-offwhite overflow-x-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber/[0.06] rounded-full blur-[120px]" />

      {/* Nav */}
      <nav className="relative max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center">
            <span className="text-ink font-display font-bold text-xs">A</span>
          </div>
          <span className="font-display font-semibold">ApplyAI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate hover:text-offwhite transition-colors">
            Log in
          </Link>
          <Link
            to="/register"
            className="text-sm px-4 py-2 rounded-lg bg-amber text-ink font-medium hover:bg-amber/90 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-28 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate mb-7 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Agent-powered internship applications
          </span>

          <h1 className="font-display text-5xl sm:text-[3.4rem] font-semibold leading-[1.08] mb-6 tracking-tight">
            Let the agent write
            <br />
            your <span className="text-amber">application</span>.
            <br />
            You decide who to send it to.
          </h1>

          <p className="text-slate text-lg max-w-md mb-10 leading-relaxed">
            Upload your resume once. ApplyAI matches you to internships and drafts a
            tailored resume, cover letter and outreach message for every one — copy-ready.
          </p>

          <div className="flex items-center gap-3 mb-12">
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-amber text-ink font-medium hover:bg-amber/90 transition-colors"
            >
              Start matching →
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg border border-white/10 text-offwhite font-medium hover:border-white/20 transition-colors"
            >
              I have an account
            </Link>
          </div>

          <div className="flex items-center gap-8 font-mono">
            <div>
              <p className="text-2xl font-semibold text-offwhite">4</p>
              <p className="text-xs text-slate">agent steps</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-2xl font-semibold text-offwhite">0</p>
              <p className="text-xs text-slate">auto-submissions</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-2xl font-semibold text-offwhite">100%</p>
              <p className="text-xs text-slate">your call</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-amber/10 to-transparent rounded-3xl blur-2xl" />
          <div className="relative -rotate-2 hover:rotate-0 transition-transform duration-500">
            <MockJobCard />
          </div>
        </div>
      </section>

      {/* Pipeline — signature element, connected timeline */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28">
        <p className="text-xs text-slate uppercase tracking-widest font-mono mb-8">How it works</p>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="hidden lg:block absolute top-[38px] left-[12.5%] right-[12.5%] h-px bg-white/10" />
          {steps.map((step) => (
            <div key={step.num} className="relative bg-ink-light border border-white/5 rounded-2xl p-6 hover:border-amber/30 transition-colors">
              <div className="w-9 h-9 rounded-full bg-ink border border-white/10 flex items-center justify-center mb-4 relative z-10">
                <span className="font-mono text-xs text-amber">{step.num}</span>
              </div>
              <h3 className="font-display font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust statement */}
      <section className="max-w-3xl mx-auto px-6 pb-28">
        <div className="border border-white/5 rounded-2xl p-7 bg-ink-light/50">
          <h3 className="font-display font-semibold mb-2">You stay in control</h3>
          <p className="text-sm text-slate leading-relaxed">
            ApplyAI never submits applications on its own. It prepares the materials — you
            review, copy, and apply directly on the company's own posting.
          </p>
        </div>
      </section>

      <footer className="relative border-t border-white/5 py-8">
        <p className="text-center text-xs text-slate font-mono">ApplyAI · built for internship season</p>
      </footer>
    </div>
  );
};

export default Landing;