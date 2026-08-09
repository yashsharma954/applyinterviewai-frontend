// src/pages/Landing.jsx
import { Link } from "react-router-dom";

const steps = [
  { num: "01", title: "Upload resume", desc: "ApplyAI reads your skills, projects and experience automatically." },
  { num: "02", title: "Set preferences", desc: "Tell it the roles, locations and stipend you're looking for." },
  { num: "03", title: "Get matched", desc: "It finds internships and scores each one against your profile." },
  { num: "04", title: "Apply with materials ready", desc: "Tailored resume points, cover letter and outreach message — generated per job." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-ink text-offwhite">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate mb-8 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Agent-powered internship applications
        </span>

        <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[1.1] mb-6">
          Let the agent write your
          <br />
          <span className="text-amber">application</span>, you decide who to send it to.
        </h1>

        <p className="text-slate text-lg max-w-xl mx-auto mb-10">
          Upload your resume once. ApplyAI matches you to internships and drafts a tailored
          resume, cover letter and outreach message for every one — copy-ready.
        </p>

        <div className="flex items-center justify-center gap-3">
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
            I already have an account
          </Link>
        </div>
      </section>

      {/* Pipeline / Steps — signature element */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-ink-light border border-white/5 rounded-2xl p-6 hover:border-amber/30 transition-colors"
            >
              <span className="font-mono text-sm text-amber">{step.num}</span>
              <h3 className="font-display font-semibold mt-3 mb-2">{step.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What it doesn't do — honesty builds trust */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="border border-white/5 rounded-2xl p-6 bg-ink-light/50">
          <h3 className="font-display font-semibold mb-2">You stay in control</h3>
          <p className="text-sm text-slate leading-relaxed">
            ApplyAI never submits applications on its own. It prepares the materials — you
            review, copy, and apply directly on the company's own posting.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <p className="text-center text-xs text-slate font-mono">ApplyAI · built for internship season</p>
      </footer>
    </div>
  );
};

export default Landing;