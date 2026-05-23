import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { setCurrentUser, setToken } from "../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    cityId: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/cities").then(setCities).catch(() => setCities([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Quand l'utilisateur retape, on efface l'erreur du champ
    if (name === "email" || name === "password") {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldErrors({
      email: "",
      password: "",
      general: "",
    });

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setFieldErrors((prev) => ({
        ...prev,
        general: "Please fill in all required fields.",
      }));
      return;
    }

    // Validation frontend du password
    if (formData.password.length < 8) {
      setFieldErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters.",
      }));
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        cityId: formData.cityId ? Number(formData.cityId) : null,
      };

      const data = await api.post("/auth/register", payload);

      setToken(data.token);
      setCurrentUser(data.user);

      navigate("/dashboard");
    } catch (err) {
      const message = err.message || "Cannot connect to backend.";

      // Si le backend dit que l'email existe déjà
      if (
        message.toLowerCase().includes("email") &&
        (
          message.toLowerCase().includes("exist") ||
          message.toLowerCase().includes("already")
        )
      ) {
        setFieldErrors((prev) => ({
          ...prev,
          email: "This email already exists.",
        }));
      }

      // Si le backend dit que le password est faux/invalide
      else if (
        message.toLowerCase().includes("password") ||
        message.toLowerCase().includes("pass")
      ) {
        setFieldErrors((prev) => ({
          ...prev,
          password: "Password is invalid.",
        }));
      }

      // Erreur générale
      else {
        setFieldErrors((prev) => ({
          ...prev,
          general: message,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-primary min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-[rgba(252,249,248,0.7)] backdrop-blur-[24px]">
        <div className="text-2xl font-headline font-extrabold tracking-tighter text-primary">
          SportMate
        </div>

        <Link
          to="/login"
          className="font-label text-sm font-bold text-primary hover:text-secondary-container"
        >
          Login
        </Link>
      </header>

      <main className="flex-grow pt-20 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary-container blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-tertiary-fixed-dim blur-[100px]"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
          <div className="lg:col-span-6 space-y-8 pr-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-widest uppercase">
              Find your sports teammates !
            </span>

            <h1 className="text-5xl md:text-6xl font-headline leading-none text-primary tracking-tight">
              SportMate
            </h1>

            <p className="text-lg text-on-surface-variant max-w-md">
              Looking for players for your next game? SportMate helps you find
              teammates, join matches, and build your sports community.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_12px_40px_rgba(28,27,27,0.06)] border border-outline-variant/10">
              <div className="mb-10">
                <h2 className="text-3xl font-headline text-primary mb-2">
                  Create your profile
                </h2>

                
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={fieldErrors.email}
                />

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider block">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 pr-12 text-on-surface focus:ring-2 focus:ring-primary/20 ${
                        fieldErrors.password ? "ring-2 ring-red-500" : ""
                      }`}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
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

                  {fieldErrors.password && (
                    <p className="text-sm text-red-600 font-semibold">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider block">
                    City
                  </label>

                  <select
                    name="cityId"
                    value={formData.cityId}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Choose a city</option>

                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {fieldErrors.general && (
                  <p className="text-sm text-red-600 font-semibold">
                    {fieldErrors.general}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-on-primary font-headline font-bold py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", error }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-primary uppercase tracking-wider block">
        {label}
      </label>

      <input
        className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 ${
          error ? "ring-2 ring-red-500" : ""
        }`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />

      {error && (
        <p className="text-sm text-red-600 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}