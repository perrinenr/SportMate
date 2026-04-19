import React from "react";
import { Link } from "react-router-dom";

export default function MatchesPage() {
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
            className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1"
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
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">account_circle</span>
            Profile
          </Link>
        </nav>

        <div className="space-y-3 mt-auto">
          <Link
            to="/matches/create"
            className="block w-full text-center bg-[#10207a] text-white py-4 rounded-xl font-headline font-bold shadow-lg active:scale-95 transition-transform hover:bg-[#0b1760]"
            >
            Create Match
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-grow min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 w-full h-16 bg-stone-50/70 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <span className="font-headline font-bold text-xl tracking-tight text-indigo-950">
              Matches
            </span>

            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-stone-400">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input
                className="bg-stone-100 border-none rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 w-80 font-body"
                placeholder="Search matches, venues, or athletes..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-4 text-sm">
              <Link
                to="/matches"
                className="text-stone-500 hover:text-primary font-headline font-semibold transition-colors"
              >
                Season View
              </Link>
              <Link
                to="/teams"
                className="text-stone-500 hover:text-primary font-headline font-semibold transition-colors"
              >
                Team Roster
              </Link>
            </div>

            <button className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            <button className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">history</span>
            </button>

            <div className="w-8 h-8 rounded-full overflow-hidden ml-1 ring-2 ring-stone-200">
              <img
                alt="Pro Manager Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFwdfIG71pygJzpKzHVF8TWxrNeL72oeVnly5GBRebwnyNKuoaPkmtAs3LS1IYAycgaS4MWkh4jXj3l2vQrS6bNKWA2Z7fla0tz8RtaBRF589GO2UwFCetlIRrYhR3pV_I_PRkPP8Dk9RHTl93BipHo1E2vGn6w72Uq4DCuAyps0AL-pM0sg2Fbo4n2-mDnHPsrnTm6AjI9Eji-nSJaBgR6j2tdnWY8JwiZKTRbj9pfemqMtVHIyCLTetAjH_0yR7fxRS0BedTHc64"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto space-y-8">
          {/* Hero */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Match Center
              </span>
              <span className="text-stone-400 text-sm font-label">
                Schedule and activity
              </span>
            </div>

            <h1 className="font-headline text-5xl leading-none text-primary">
              Matches
            </h1>

            <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-3xl">
              Track upcoming events, manage drafts, and review scheduled
              competitions from one place.
            </p>
          </section>

          {/* Tabs */}
          <section className="flex gap-8 border-b border-stone-200">
            <Link
              to="/matches"
              className="pb-4 font-headline text-sm font-bold text-primary border-b-2 border-primary"
            >
              Upcoming Matches
            </Link>
            <Link
              to="/matches"
              className="pb-4 font-headline text-sm font-medium text-stone-500 hover:text-primary transition-colors"
            >
              Past Matches
            </Link>
            <button className="pb-4 font-headline text-sm font-medium text-stone-500 hover:text-primary transition-colors">
              Drafts
            </button>
          </section>

          <section className="grid grid-cols-12 gap-6">
            {/* Left filters */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <div className="bg-surface-container-low p-6 rounded-xl shadow-sm">
                <h3 className="font-headline text-sm font-bold mb-4 text-primary">
                  Quick Filters
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-stone-300 group-hover:border-primary transition-colors flex items-center justify-center bg-white">
                      <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </div>
                    <span className="text-sm font-medium text-stone-600">
                      High Intensity
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-stone-300 group-hover:border-primary transition-colors flex items-center justify-center bg-white">
                      <div className="w-3 h-3 bg-primary rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-stone-600">
                      Professional League
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-stone-300 group-hover:border-primary transition-colors flex items-center justify-center bg-white">
                      <div className="w-3 h-3 bg-primary rounded-sm opacity-0"></div>
                    </div>
                    <span className="text-sm font-medium text-stone-600">
                      Scrimmages
                    </span>
                  </label>
                </div>
              </div>

              <div className="bg-primary p-6 rounded-xl text-on-primary shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
                <span className="material-symbols-outlined mb-4 text-3xl">
                  bolt
                </span>
                <h4 className="font-headline text-lg font-bold leading-tight mb-2">
                  Ready to scout?
                </h4>
                <p className="text-blue-100/80 text-xs mb-4">
                  You have 3 matches scheduled today with high-tier athletes.
                </p>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 transition-all rounded-lg text-xs font-bold font-headline">
                  View Schedule
                </button>
              </div>
            </div>

            {/* Match list */}
            <div className="col-span-12 lg:col-span-9 space-y-4">
              <div className="group bg-surface-container-lowest hover:bg-white transition-all duration-300 p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-5 border border-transparent hover:border-primary/10 shadow-sm hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      sports_soccer
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Confirmed
                      </span>
                      <h3 className="font-headline text-base font-bold text-primary">
                        Regional Quarter Finals
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          calendar_today
                        </span>
                        Oct 24, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          schedule
                        </span>
                        19:00 - 21:00
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          location_on
                        </span>
                        Elite Arena, NY
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyWu24ttY8nVkVe-T-nfcjE7Wrhei3HJai_oP_dBNqeObXZ6d8ScMNfZ2kBgYnu9rnVf-1tbk3CNQpXFzyJZCBMR-p7a-Ji5rPHqJKbDce2XDC-YALIeJbkkWL1Z9eatiMjldqzchJSp0hMHtHirgX67qm6wUMUOumcVu_h24F7fxkJnPyooS8kccK5yqixUjfbJYwKCoodmqCyX4fqhc-NTH_R47RLiGPdM57vqe4tu36ad3qjIeKtYFF3quuYxS3faBN2ssZL_OV"
                      alt="player"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2-wGlnk3qdRGBZSsi_qreee8SRCp72B68XswiavWQckKTFIrigePP-7MD-rg5HsVXRZQZ6eh8r86QDPJBp8lRGSTJqNM_9HKOjZ_jAKM_ncczl3qBQH1Qs0B57c1j7C_D4yP913FfLaaXuJNk3CqH0iYGTSu_Ovq9RJb1tlDvzVConzkuhLL5qVvlY9-Bw5hOkuqpPnptlwSSxGQZcfuUVwxmtMjzTf7jZWeGpKLKjNfhMf1ZBFPZif0XVU6CRJNIPwRFVCXzZReb"
                      alt="player"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk7Y76PR4oh6qGUgvOj49LHaLwd_tmTg_nO9u5ZBQgj7_kUxmEd7SPJbaUJDkAeXxFnukYRTyIAIVcvpY9apBvTQWXwXTM9Txrw7UbPPHEW3Mxa5pvafsGx3hTvv5mwyHMt8k8UCqt9cTkPTyP5YZxKW2EiClqh6a9MtbllD1XdcS1rRbVXFAjvmubpVuYCmMOL1NRzibflu3SUZlY1mnJlE2TijdLSMMwQK5nqjFklmmuwyjpeT_g4C6eSzY17EmQIXMAhNnLsYeY"
                      alt="player"
                    />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold text-stone-500">
                      +12
                    </div>
                  </div>

                  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>

              <div className="group bg-surface-container-lowest hover:bg-white transition-all duration-300 p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-5 border border-transparent hover:border-primary/10 shadow-sm hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      sports_basketball
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Draft
                      </span>
                      <h3 className="font-headline text-base font-bold text-primary">
                        Sunset Scrimmage: Team Alpha
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          calendar_today
                        </span>
                        Oct 26, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          schedule
                        </span>
                        17:30 - 19:30
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          location_on
                        </span>
                        Brooklyn Heights Court
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_UhQuzw0bavZgGgEEUp0V6XLAXyNqgLzen4Ua0sEsK4maniSvOHcvd3acA7BJNu2OnUlNAPCW3-yYuzg20NZdHfb5b0ljXvHc_OpRPw2A54WMrnlOryHc8LSD5YBYE407pK81tfB3nk9jpmzjORxFtnT8inUApMoRD2R1-l2il8g_CXnGnSheJtvHs_lbJIRivsPCsuz-0wberLCdzZu-sLBKRsoD4aWGmSm7pE-g7vdPOPsFD4jpHFtxxawUw56EF6b-33PJwQPH"
                      alt="player"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbPLysai6ekhJHDPuQ80p59GtgeBt4srarGm2FhjpkG67YBMhI3PzaYuMzEEOFcqktbX36ikdnUnwrAVs1riq08pBQUbA-W3c_GhMeX5p-nMLuuIdGnGzvRE1CGmoXAEs7MNaMY8b9GGcecRkFjqHz3ED1ChF14PH_7mgifXOscnSN5s7JJhKPPh3XHAatOGkfOhjm19erSkKS4n_6dLfLE-FpN-fo9Wa3Be-1hcHHsMpPt7413P1yxCRFn-1LEh--nJhunJdGF1Yx"
                      alt="player"
                    />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold text-stone-500">
                      +4
                    </div>
                  </div>

                  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>

              <div className="group bg-surface-container-lowest hover:bg-white transition-all duration-300 p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-5 border border-transparent hover:border-primary/10 shadow-sm hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-tertiary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      sports_tennis
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Confirmed
                      </span>
                      <h3 className="font-headline text-base font-bold text-primary">
                        Pro-Am Doubles Invitational
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          calendar_today
                        </span>
                        Nov 02, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          schedule
                        </span>
                        10:00 - 13:00
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          location_on
                        </span>
                        Central Park Tennis Center
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYNso2q7EtN-j4L1oGZmqRaIHx78C-O_VF9xYxVVldZ50_gY3sFwdyW83P1ktOht0KkwPBoXG-wn7P5OA_Aqb6m341T4eVio-SbZp9MuCTbPq6kTw6EpS4mvPoBQJVVjLqaTHfEFp9f8RDq2pA77j_MN5a1bcCUDEtfUpV6_UvqzTWBdSpks8B2pjnUS1BkSIrO50G28ZY9QaQyvzGHiJDpAg8IyuVBsuMRTaTMw3JaJ3yFK2SPlxKMp4TEoxf3EAri7gufGOlVv-J"
                      alt="player"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtiRlY4m9do9jlxg0fhmxCbb946N28vK6c5n3ksYEB1CQis4FK75-ADHwsw4NQCIUxx784e-dh7Jg0hW-BwPGjzkKPBC7C9On-ol-cVJkSaGyX1AaPbqOZWoDVaoGuFyJlQWPyOKfOEHznbVkbZNnb1vP5AhT6yLAIYx4odhhp9lHues7ddmHpH5DLSH6HSJEODIdkinTe-dy2bge5OX8AgpCc8-rrthIOFRSfAVmqqs1JuU1XRwFfiK3Yj-PxpRMPveqXfbhnWyYU"
                      alt="player"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_wtwYlHrHKx41Tq-_P_uie15xz37cP68xZVFRENL_msJUmnw85m7PlG2ZHaMa13l-ikHGspsIXpR5AgwWekVKuLdKzB6h1rei6XBrIXBoVZ91EEAkoqutvIOTN1ubDuYrWxKXUEwSwDmPpMcUkLsDHa7PTulEx5ZGMJKFjo8FRvCZjm-mPaNLwGfb-ChDTgbu9ViUYpC3twdwHPCG5ViGKyfHIb88gfwLVS2Id0ej7VBQL8cm1r_I8Yskw_U8fcoXEo5Si13HFqdO"
                      alt="player"
                    />
                  </div>

                  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-low border-2 border-dashed border-stone-300 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-stone-400 mb-4">
                  <span className="material-symbols-outlined text-3xl">
                    add_circle
                  </span>
                </div>

                <h4 className="font-headline text-lg font-bold text-primary mb-1">
                  Scale your season
                </h4>
                <p className="text-on-surface-variant text-sm max-w-xs mx-auto">
                  Start planning your next elite athletic event or competitive
                  match.
                </p>

                <Link
                  to="/matches/create"
                  className="mt-6 px-6 py-3 bg-gradient-primary text-on-primary rounded-xl font-headline font-bold text-sm shadow-lg active:scale-95 transition-all"
                >
                  Start Designing Match
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}