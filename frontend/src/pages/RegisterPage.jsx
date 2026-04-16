import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5156/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setMessage(data.message || "Register success.");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError("Cannot connect to backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-primary min-h-screen flex flex-col">
      <header className="bg-white/70 backdrop-blur-xl fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-20">
        <div className="text-2xl font-bold tracking-tighter text-[#1A237E]">
          SportMate
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-black/60 hover:text-[#1A237E] transition-colors text-sm tracking-wide"
            href="#"
          >
            Support
          </a>
          <a
            className="text-black/60 hover:text-[#1A237E] transition-colors text-sm tracking-wide"
            href="#"
          >
            Help Center
          </a>
        </nav>
      </header>

      <main className="flex-grow pt-20 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary-container blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-tertiary-fixed-dim blur-[100px]"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
          <div className="lg:col-span-6 space-y-8 pr-12">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-widest uppercase">
                Next-Gen Management
              </span>

              <h1 className="text-5xl md:text-6xl font-headline leading-none text-primary tracking-tight">
                SportConnect <br />
              </h1>

              <p className="text-lg text-on-surface-variant max-w-md">
                Join the elite circle of high-performance athletes and managers.
                Centralize your sporting career with editorial precision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-6 rounded-xl space-y-2">
                <span className="material-symbols-outlined text-primary">
                  insights
                </span>
                <h3 className="font-headline font-bold text-primary">
                  Live Metrics
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Real-time performance analytics tracked with fintech precision.
                </p>
              </div>

              <div className="bg-surface-container-low p-6 rounded-xl space-y-2">
                <span
                  className="material-symbols-outlined text-tertiary-fixed-dim"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <h3 className="font-headline font-bold text-primary">
                  Secure Vault
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Proprietary encryption for contract and bio management.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_12px_40px_rgba(28,27,27,0.06)] border border-outline-variant/10">
              <div className="mb-10">
                <h2 className="text-3xl font-headline text-primary mb-2">
                  Create your identity
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Complete the form below to initiate your curation profile.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary uppercase tracking-wider block">
                      First Name
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Perrine"
                      type="text"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary uppercase tracking-wider block">
                      Last Name
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Nassar"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider block">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="perrinenassar@gmail.com"
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider block">
                    Password
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••"
                    type="password"
                  />
                </div>

                <div className="flex items-start gap-3 py-2">
                  <input
                    className="mt-1 rounded-sm border-outline-variant text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    I agree to the{" "}
                    <a
                      className="text-primary font-semibold hover:underline"
                      href="#"
                    >
                      Terms of Service
                    </a>{" "}
                    and acknowledge the{" "}
                    <a
                      className="text-primary font-semibold hover:underline"
                      href="#"
                    >
                      Privacy Policy
                    </a>{" "}
                    governing SportMate data curation.
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}

                {message && (
                  <p className="text-sm text-green-600 font-medium">
                    {message}
                  </p>
                )}

                <button
                  className="w-full bg-kinetic-gradient text-on-primary py-4 rounded-xl font-headline font-bold text-lg hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-70"
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? "Registering..." : "Register Profile"}</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-surface-container flex justify-center">
                <p className="text-sm text-on-surface-variant">
                  Already have an account?
                  <a
                    className="text-primary font-bold hover:text-primary-container transition-colors ml-1"
                    href="#"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
          <div className="flex items-center gap-2 grayscale brightness-0">
            <span className="material-symbols-outlined text-2xl">
              workspace_premium
            </span>
            <span className="font-headline font-bold tracking-tighter text-xl">
              ELITE SERIES
            </span>
          </div>

          <div className="flex items-center gap-2 grayscale brightness-0">
            <span className="material-symbols-outlined text-2xl">
              monitoring
            </span>
            <span className="font-headline font-bold tracking-tighter text-xl">
              VELOCITY AI
            </span>
          </div>

          <div className="flex items-center gap-2 grayscale brightness-0">
            <span className="material-symbols-outlined text-2xl">
              shield_with_heart
            </span>
            <span className="font-headline font-bold tracking-tighter text-xl">
              PRO-HEALTH
            </span>
          </div>

          <div className="flex items-center gap-2 grayscale brightness-0">
            <span className="material-symbols-outlined text-2xl">
              group_work
            </span>
            <span className="font-headline font-bold tracking-tighter text-xl">
              SYNDICATE
            </span>
          </div>
        </div>
      </main>

      <footer className="bg-[#f6f3f2] dark:bg-[#1c1b1b] w-full py-12 tonal-shift-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-4">
          <div className="flex items-center gap-6">
            <p className="font-['Inter'] text-sm tracking-wide text-[#1c1b1b]/50 dark:text-white/40">
              © 2026 SportMate Management. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8">
            <a
              className="text-[#1c1b1b]/50 dark:text-white/40 hover:text-[#1A237E] dark:hover:text-[#3ce36a] transition-all font-['Inter'] text-sm tracking-wide"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-[#1c1b1b]/50 dark:text-white/40 hover:text-[#1A237E] dark:hover:text-[#3ce36a] transition-all font-['Inter'] text-sm tracking-wide"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-[#1c1b1b]/50 dark:text-white/40 hover:text-[#1A237E] dark:hover:text-[#3ce36a] transition-all font-['Inter'] text-sm tracking-wide"
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