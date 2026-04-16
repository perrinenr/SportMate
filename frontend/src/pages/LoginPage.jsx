import { useState } from "react";
import { Link } from "react-router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5156/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      setMessage(data.message || "Login success.");
      console.log(data.user);
    } catch (err) {
      console.error(err);
      setError("Cannot connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-[rgba(252,249,248,0.7)] backdrop-blur-[24px]">
        <div className="text-2xl font-headline font-extrabold tracking-tighter text-primary">
          SportMate
        </div>

        <div className="hidden md:flex gap-8">
          <a
            className="font-label text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Support
          </a>
          <a
            className="font-label text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Help Center
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-20 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-fixed opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary-fixed opacity-10 rounded-full blur-3xl"></div>
        </div>

        <section className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl p-10 md:p-12 shadow-[0_12px_40px_rgba(28,27,27,0.04)] relative">
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-2">
              Welcome back
            </h1>
            <p className="font-body text-on-surface-variant">
              Sign in to manage your professional athletic portfolio.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-primary uppercase tracking-wider block"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 pr-12 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label
                  className="text-sm font-bold text-primary uppercase tracking-wider block"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 pr-12 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"

                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[linear-gradient(135deg,#000666_0%,#1a237e_100%)] text-on-primary font-headline font-bold py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

            <div className="mt-8 pt-8 border-t border-surface-container flex justify-center">
            <p className="font-body text-sm text-on-surface-variant">
              Don't have an account?
              <Link
                  className="font-bold text-primary hover:text-secondary-container transition-colors ml-1"
                  to="/register"
              >
                Create Account
              </Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 bg-transparent">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-4">
          <p className="font-label text-sm tracking-wide text-on-surface-variant/50">
            © 2026 SportMate Management. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              className="font-label text-xs font-medium text-on-surface-variant/50 hover:text-primary transition-all"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label text-xs font-medium text-on-surface-variant/50 hover:text-primary transition-all"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-label text-xs font-medium text-on-surface-variant/50 hover:text-primary transition-all"
              href="#"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}