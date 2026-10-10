import React, { useState } from 'react';
import { UserCheck, Building2, Lock, Mail, Phone, X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, initialRole = 'expert' }) {
  const [role, setRole] = useState(initialRole); // 'expert' or 'company'
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail('');
    setPassword('');
    setName('');
    setCompanyName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          title="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="text-center space-y-6 py-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">
                {role === 'expert' ? 'Welcome Back, Senior Expert!' : 'Welcome, Partner Company!'}
              </h3>
              <p className="text-base text-slate-600">
                You have successfully logged in as {role === 'expert' ? 'a Retired Professional Advisor' : 'an Enterprise Hirer'}.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-4 rounded-2xl text-base font-extrabold bg-sky-600 hover:bg-sky-700 text-white shadow-lg transition-all"
            >
              Continue to {role === 'expert' ? 'Expert Dashboard' : 'Company Portal'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                ElderExpert Portal Access
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Select your account type to sign in or register.
              </p>
            </div>

            {/* Account Type Selector (Elder Expert vs Company) */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setRole('expert')}
                className={`py-3 px-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
                  role === 'expert'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <UserCheck className="w-5 h-5" />
                <span>Elder / Retired Expert</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('company')}
                className={`py-3 px-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
                  role === 'company'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>Company / Hirer</span>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* If signing up */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    {role === 'expert' ? 'Full Name' : 'Company Contact Person'}
                  </label>
                  <input
                    type="text"
                    placeholder={role === 'expert' ? 'E.g., Dr. Arthur Pendelton' : 'E.g., Sarah Vance (HR Director)'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base focus:outline-none focus:border-sky-600 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              )}

              {isSignUp && role === 'company' && (
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Organization / Business Name</label>
                  <input
                    type="text"
                    placeholder="E.g., AcroTech Dynamics Inc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base focus:outline-none focus:border-emerald-600 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base focus:outline-none focus:border-sky-600 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base focus:outline-none focus:border-sky-600 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-4 rounded-2xl text-base font-extrabold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                  role === 'expert'
                    ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/30'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                }`}
              >
                <span>{isSignUp ? 'Create Free Account' : 'Sign In Now'}</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </form>

            {/* Toggle sign in / sign up */}
            <div className="text-center text-sm font-semibold text-slate-600 pt-2 border-t border-slate-200">
              {isSignUp ? (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-sky-600 hover:underline font-extrabold"
                  >
                    Sign In Here
                  </button>
                </p>
              ) : (
                <p>
                  New to ElderExpert?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-sky-600 hover:underline font-extrabold"
                  >
                    Register as {role === 'expert' ? 'Expert' : 'Company'}
                  </button>
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
