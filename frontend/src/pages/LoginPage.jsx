import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    // Add your login logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Manrope']">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Welcome back</h1>
          <p className="text-slate-500">Sign in to manage your professional athletic portfolio.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                placeholder="name@sportconnect.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-xs font-bold text-indigo-700 hover:text-indigo-800 transition-colors">
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A237E] hover:bg-indigo-900 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 relative text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-widest">
            Or continue with
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-95">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="h-5 w-5 mr-3" />
            <span className="text-sm font-bold text-slate-700">Google</span>
          </button>
          <button className="flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-95">
            <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.39 5.98.67 7.28-.61 1.5-1.47 3.14-2.72 3.93zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-sm font-bold text-slate-700">Apple</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <a href="#" className="font-bold text-indigo-700 hover:text-indigo-800 transition-colors">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;