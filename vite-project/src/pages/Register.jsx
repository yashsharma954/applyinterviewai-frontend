// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(fullName, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration fail ho gaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center">
              <span className="text-ink font-display font-bold text-sm">A</span>
            </div>
            <span className="font-display font-semibold text-xl text-offwhite">ApplyAI</span>
          </div>
          <p className="text-slate text-sm">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ink-light rounded-2xl p-6 border border-white/5">
          {error && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <label className="block text-xs text-slate mb-1.5">Full name</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 px-3 py-2.5 rounded-lg bg-ink border border-white/10 text-offwhite text-sm focus:border-amber outline-none transition-colors"
            placeholder="Yash Sharma"
          />
          <label className="block text-xs text-slate mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2.5 rounded-lg bg-ink border border-white/10 text-offwhite text-sm focus:border-amber outline-none transition-colors"
            placeholder="you@example.com"
          />
          <label className="block text-xs text-slate mb-1.5">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-3 py-2.5 rounded-lg bg-ink border border-white/10 text-offwhite text-sm focus:border-amber outline-none transition-colors"
            placeholder="Min. 8 characters"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-amber text-ink font-medium text-sm hover:bg-amber/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;