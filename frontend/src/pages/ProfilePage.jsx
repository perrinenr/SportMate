import React from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-stone-100 flex flex-col p-6 gap-8 z-50">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline font-extrabold text-2xl text-indigo-950">
            SportMate
          </h1>
          <p className="font-label text-xs text-stone-500 uppercase tracking-widest">
            Management Suite
          </p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link
            to="/matches"
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">sports_soccer</span>
            Matches
          </Link>

          <Link
            to="/teams"
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">groups</span>
            Teams
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1"
          >
            <span className="material-symbols-outlined">account_circle</span>
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-grow min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 w-full h-16 bg-stone-50/70 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <span className="font-headline font-bold text-xl tracking-tight text-indigo-950">
              Profile
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            <Link
              to="/settings"
              className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined">settings</span>
            </Link>

            <div className="w-8 h-8 rounded-full overflow-hidden ml-2 ring-2 ring-stone-200">
              <img
                alt="User avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8IQh4g_ApaCcGzoNDRfk9XjybHdlG6cDzIuX716crYugeEtFbddBrbgQc4Fc6QQO3Ek-EtKFZCxxFCYUW4TZNuSNEAP1Lbhr4BflAdU_J08C0JxfiAoaV1FoeeZwR1J7uirLmxaBhceS-sIcSyfgpVexjRbhNPDb8PxabX3hzMk90DUM1WWX_tDVHPAWxGVYSn2-SPrVuqYukkNWqSsaljjvkXoXlgtD58p5gxmV7GQSRvzuRF-AUSKtaWgId1c8xLmm45SmjxWGM"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto space-y-8">
          {/* Hero profile card */}
          <section className="bg-surface-container-lowest rounded-xl p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.2,-0.7C83.3,14.3,76.1,28.6,67.3,41.2C58.5,53.8,48.1,64.7,35.5,72.4C22.9,80.1,8.1,84.6,-6.9,82.3C-21.9,80,-37.1,70.9,-49.7,59.3C-62.3,47.7,-72.3,33.6,-77.8,18.1C-83.3,2.6,-84.3,-14.3,-79.1,-29.7C-73.9,-45.1,-62.5,-59,-48.5,-66C-34.5,-73,-17.2,-73.1,-0.3,-72.5C16.6,-71.9,31.3,-83.6,44.7,-76.4Z"
                  fill="#000666"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="flex items-center gap-8 relative z-10">
              <div className="relative">
                <div className="w-32 h-32 rounded-xl overflow-hidden ring-4 ring-white shadow-xl">
                  <img
                    alt="Marcus Sterling"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8sm2c46fdlFneh0BWDZVutO3PEnsC9A4LtV5XXpw0YQatfPBfzrEiD3ixYZJwSvouktCOqNmTQt8piHKSVGNvDTeO7kBkXIlyDNozXWDdkvCHuJHDD-vJKtbASoLZ62olF6xwX9SHsS94UnydaCp7iduk7gvaryzLd5n9b9quOGdPlrG-RQko9inr9qAdyqK8o04a-iPbi92gKyg-Vue6b1lhEhUbztH8k2oWGc6pZJQeC1GkFibUxO2bK8lz4G0vU_27qg4LUFAu"
                  />
                </div>

                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-tertiary-fixed-dim rounded-full flex items-center justify-center ring-4 ring-white">
                  <span
                    className="material-symbols-outlined text-[16px] text-on-tertiary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-extrabold tracking-tight text-primary font-headline">
                  Marcus Sterling
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-stone-500 font-medium">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    <span className="text-sm">London, United Kingdom</span>
                  </div>

                  <div className="w-1 h-1 bg-stone-300 rounded-full"></div>

                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      sports_handball
                    </span>
                    <span className="text-sm">Pro Manager</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 relative z-10">
              <button className="px-6 py-3 rounded-xl font-bold border border-stone-200 hover:bg-surface-container-low transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  share
                </span>
                <span>Share</span>
              </button>

              <Link
                to="/profile/edit"
                className="px-6 py-3 bg-gradient-to-r from-[#0a1670] to-[#1A237E] text-white rounded-xl font-headline font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
               <span className="material-symbols-outlined text-[20px]">
                   edit
                </span>
                <span>Edit Profile</span>
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-6">
            {/* Left column */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-surface-container-low rounded-xl p-8 space-y-6 shadow-sm">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2 font-headline">
                  <span className="material-symbols-outlined">info</span>
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">
                        Email Address
                      </p>
                      <p className="font-medium text-on-surface">
                        marcus.sterling@kinetic.pro
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">
                        Phone Number
                      </p>
                      <p className="font-medium text-on-surface">
                        +44 20 7946 0128
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-200">
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-3">
                    Bio
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Dedicated sports manager and community organizer with over
                    12 years of experience in facilitating amateur and semi-pro
                    football leagues. Passionate about leveraging technology to
                    streamline athlete management and match coordination.
                  </p>
                </div>
              </div>

              <div className="bg-primary rounded-xl p-8 text-white relative overflow-hidden shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2 font-headline">
                    Weekly Performance
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight">
                      84%
                    </span>
                    <span className="text-tertiary-fixed-dim text-sm font-bold flex items-center">
                      <span className="material-symbols-outlined text-sm">
                        trending_up
                      </span>
                      +12%
                    </span>
                  </div>
                  <p className="text-blue-100/80 text-xs mt-2">
                    Active participation vs last month
                  </p>
                </div>

                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <span className="material-symbols-outlined text-[120px]">
                    insights
                  </span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-primary font-headline">
                    Active Involvement
                  </h3>
                  <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                    View History
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface-container-lowest p-6 rounded-xl group hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)] transition-all cursor-pointer shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-secondary-fixed flex items-center justify-center overflow-hidden">
                          <img
                            alt="Team Crest"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBVzTfKCuMrxTRdwP9qGh443pygVRNmYN-FfgWD8b-7whIyWqo1rYLJ0zg_2rvETiQq3OIwP3QdDrmXENOIVgz_AxzEul2t3SQ4bgxWiCMOblUQwZHmdYUq6I_9CbBL_0AjxRmPrwA12F6LShb5auuqpIX39ZvR-TFP0cCBHwEj4t9YQkYf7NG63dR9acDVYw35EQEeBLNu9Lcz_CLl2wrdjUqXIcMMK3w3XW8wnvP-GAP9YbB09_P0AdbAw2FEDdOGumE0fnsW8Vd"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                            Football • Elite
                          </p>
                          <h4 className="text-lg font-bold font-headline">
                            London Titans FC
                          </h4>
                        </div>
                      </div>

                      <span className="material-symbols-outlined text-stone-400 group-hover:text-primary transition-colors">
                        arrow_outward
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-3">
                        <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                          <img
                            alt="Member"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJzkNefWKfeOGi3H35R3LEyMBbgWINo1qtXllSW_ge4NyJjhzMeNpecxhY3PRtRMXIdyX4I5V9ydmsTV3o_YYjGbzaE5_xIbg4VOer-ZEi3yp93W7fqc-ZboJwMO7x-QApGVFR81hPD897N0DgxsZSUiSigqZ_2lqpnyhD9mkFgeIILN-TDstrzwj45XTIP38IPGDo1rWxGbElYw8-RbBL7uYnqIQVGigg1-iySa6SYFS6-VvZViqCnxiURKU0HGVJjf09Ku78nuTc"
                          />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                          <img
                            alt="Member"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKYcJN_QmuQfhPl6oEayKyW71YaQ1t2ilHHYPYgWGjmv8JpOV1XJ-lFGocDV35VJIAMwI5WndUmOLzwpF2pbkh12fQJ6kU7COVAzdfdz5aOvOQRnveZNz6CvRwD2qw6EzJqmIWaHrT2e6-mjVkP2GIsy0Gag_B0nbA3cTDDMzbzltIBUdA4zZ4RriGN6dRx9EHj2swXnsQCTKLCBDmy4LRTZE18yT-D0w9OZYL8vCHOPocFE6UGbPxSAgkbDwhJKWaTW0BUtc7qaFN"
                          />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                          <img
                            alt="Member"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyCHw01Xrj2sDob6GfIfV0rYCCs6pHUxYHaPuqGTMa21Trlxd5oidEzrVgYYuj6ZGkvMKzkZkMmjmm4gJMO6hiMmfpSTfSeOCVb66mzGGi4QNwMJ-1KhCFzl5zHMDkxNiLVgIsuvBPDJ28auBCE8uJY_8GXQNgIFUUHUTTjSefwdNRc2qeCBBACNU5tqPrclXTH_R8zNDRRoD_lNcWVwGlzwvXa0ibgKjry5JLuOoxw6krflqorFE5GDu-vaky19mmJd4nT0I8dpJt"
                          />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-stone-500">
                          +18
                        </div>
                      </div>

                      <span className="px-3 py-1 bg-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant rounded-full text-[10px] font-extrabold uppercase">
                        Lead Manager
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-6 rounded-xl group hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)] transition-all cursor-pointer border-l-4 border-primary shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold">
                            UPCOMING
                          </span>
                          <span className="text-xs font-medium text-stone-400">
                            Tomorrow, 19:00
                          </span>
                        </div>
                        <h4 className="text-lg font-bold font-headline">
                          Community Open Cup
                        </h4>
                        <p className="text-sm text-stone-500">
                          Wembley Powerleague • Pitch 4
                        </p>
                      </div>

                      <div className="w-12 h-12 bg-surface-container rounded-lg flex flex-col items-center justify-center text-primary">
                        <span className="text-xs font-bold leading-none">OCT</span>
                        <span className="text-xl font-black leading-none">24</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                      <div className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-sm text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          group
                        </span>
                        <span className="text-xs font-bold">14/16 Joined</span>
                      </div>

                      <div className="flex items-center gap-1 text-primary">
                        <span className="text-xs font-bold">Details</span>
                        <span className="material-symbols-outlined text-sm">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-container-low p-6 rounded-xl text-center shadow-sm">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                    Total Matches
                  </p>
                  <p className="text-3xl font-extrabold text-primary">248</p>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl text-center shadow-sm">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                    Teams Managed
                  </p>
                  <p className="text-3xl font-extrabold text-primary">12</p>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl text-center shadow-sm">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                    Win Rate
                  </p>
                  <p className="text-3xl font-extrabold text-tertiary-fixed-dim">
                    62%
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary-container to-secondary p-8 rounded-xl text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Early Access
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight font-headline">
                    Kinetic Winter Invitational
                  </h3>
                  <p className="text-blue-100/80 text-sm">
                    Registrations open for the December national tournament.
                  </p>
                </div>

                <Link
                  to="/teams/create"
                  className="bg-white text-secondary px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
                >
                  Register Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}