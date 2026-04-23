import React from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
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
            className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1"
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
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
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
              Welcome
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
                alt="User Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGi4eAOSUv5CYFJ3zfLaHDZv-scYdjtHiCWgD-2UcnacX-u41MONJKkrKmxjf1XvgEZWLqvMJ_13vC56l2eQU4Fq6X-1obWQ8bKtes0vQK7FMGdRZir6MKhsXhPFv5tu_SixkaYpx_h6iuesSN5Wo9Rr_jivKAU0_C8O-9o7H2ziGWI7xwTSv2bWkgkzFsxQ-AqP_RfGberQ1Hoa9blFMOcHiBrabHzKa2MmG-1ssFQa3SJEzEJVai1JlwE0K_CaIlNk5SYH5M1dRV"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto space-y-10">
          {/* Hero */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Live Overview
              </span>
              <span className="text-stone-400 text-sm font-label">
                Updated just now
              </span>
            </div>

            <h2 className="font-headline text-5xl leading-none text-primary">
              Performance Overview
            </h2>

            <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-3xl">
              Welcome back, Alex. Your teams are currently participating in 3
              active tournaments with a 78% win rate this season.
            </p>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-8 rounded-xl space-y-6 shadow-sm">
              <h3 className="font-headline font-semibold text-stone-400 text-sm uppercase tracking-widest">
                Matches
              </h3>
              <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                <span className="font-body text-stone-600">Upcoming</span>
                <span className="font-headline font-bold text-3xl text-primary">
                  06
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                <span className="font-body text-stone-600">Completed</span>
                <span className="font-headline font-bold text-3xl text-primary">
                  24
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-body text-stone-600">Win Rate</span>
                <span className="font-headline font-bold text-3xl text-tertiary-fixed-dim">
                  78%
                </span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-8 rounded-xl space-y-6 shadow-sm">
              <h3 className="font-headline font-semibold text-stone-400 text-sm uppercase tracking-widest">
                Teams
              </h3>
              <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                <span className="font-body text-stone-600">Active Teams</span>
                <span className="font-headline font-bold text-3xl text-primary">
                  03
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                <span className="font-body text-stone-600">Players</span>
                <span className="font-headline font-bold text-3xl text-primary">
                  48
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-body text-stone-600">New Prospects</span>
                <span className="font-headline font-bold text-3xl text-tertiary-fixed-dim">
                  12
                </span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <h3 className="font-headline font-semibold text-primary text-xl">
                  Manager Insight
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed text-lg">
                  Your strongest performance this month comes from tactical
                  consistency, better roster balance, and improved player
                  availability across scheduled fixtures.
                </p>
                <button className="bg-gradient-primary text-on-primary px-6 py-3 rounded-xl font-headline font-bold shadow-[0_12px_40px_rgba(0,6,102,0.15)] active:scale-95 transition-all">
                  View Full Report
                </button>
              </div>
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
          </section>

          {/* Upcoming Matches */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="font-headline font-bold text-2xl text-primary">
                My Upcoming Matches
              </h3>
              <button className="text-primary font-label font-semibold flex items-center gap-1 hover:underline">
                View Schedule
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-5 transition-all hover:bg-surface-container-high cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Premier League
                  </span>
                  <span className="text-stone-400 text-xs font-medium">
                    Tomorrow, 18:30
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center space-y-2 flex-1">
                    <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        shield
                      </span>
                    </div>
                    <p className="font-headline font-bold text-sm">Dragons FC</p>
                  </div>

                  <div className="px-4 font-headline font-extrabold text-outline-variant">
                    VS
                  </div>

                  <div className="text-center space-y-2 flex-1">
                    <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        token
                      </span>
                    </div>
                    <p className="font-headline font-bold text-sm">
                      Titans United
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-500 text-xs border-t border-stone-100 pt-4">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  <span>Stadium de France, Paris</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-5 transition-all hover:bg-surface-container-high cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Regional Cup
                  </span>
                  <span className="text-stone-400 text-xs font-medium">
                    Sat, 24 Oct, 14:00
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center space-y-2 flex-1">
                    <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        shield
                      </span>
                    </div>
                    <p className="font-headline font-bold text-sm">Dragons FC</p>
                  </div>

                  <div className="px-4 font-headline font-extrabold text-outline-variant">
                    VS
                  </div>

                  <div className="text-center space-y-2 flex-1">
                    <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        swords
                      </span>
                    </div>
                    <p className="font-headline font-bold text-sm">
                      Phoenix Elite
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-500 text-xs border-t border-stone-100 pt-4">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  <span>Riverside Sports Arena</span>
                </div>
              </div>
            </div>
          </section>

          {/* Teams + Tournaments */}
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="font-headline font-bold text-2xl text-primary">
                  My Teams
                </h3>
                <Link
                  to="/teams"
                  className="text-primary font-label font-semibold flex items-center gap-1 hover:underline"
                >
                  View Teams
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-headline text-2xl font-extrabold mb-1 text-primary">
                      Dragons FC
                    </h4>
                    <p className="text-stone-500 text-sm mb-6">
                      Lead Manager Since 2021
                    </p>

                    <div className="flex items-center -space-x-3 mb-6">
                      <img
                        alt="Team member"
                        className="w-9 h-9 rounded-full border-2 border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXCB3xyJ99-sCoAWOuuMZ4C_6qlbro5cQ4MWREWuRDRlmTd3gLI-dW9lqwDXaKsSv9xcJWN_Ktt0884XgFtqKOQFDZtVxp0ddJOySkJy30fm9E96UEp9rRUADNRQ5qU2tEy2WySCOHadaPgdyjcoaKerwOXxA_BPfnwk8U5n6QAqx9Nj2wXkVKyCre6W30i8nyVRp8Jbl3SHU9NMSG3fSZrIQjsUaD-4K0lYjuZLorvtpRTHmsFzJpakya9SsU_2dOKW7KtukeRIuI"
                      />
                      <img
                        alt="Team member"
                        className="w-9 h-9 rounded-full border-2 border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKdy3SUvSvG8L6L7RiXjzyG8FsWUt_p4iwTcryJ-IyrOhjno6JrqmqzWh6SK8TZdrNzfjfbg6RbRblAZGCcUi7pxRg5V6RaGO_lk0WlsC-_FmRtU7EBU55MyPx8JFeerhfSImeNbZXC0UtXoxLUotNqaxCl5FBvf77fZ7khcTDG776kKrL8JRKsJNaVq6BQ7ExlPD6D90ICAdW8ITNBAY71NtoI_prihwEv3oPxebewEHNMUeGDzQYch-fB9wd4YlFiwWZTvDkDre1"
                      />
                      <img
                        alt="Team member"
                        className="w-9 h-9 rounded-full border-2 border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLCnx0gL7lo5e39aAI7_OKPIB_QtKLsITQdeY4vcgeWD0hTaKME8zJ9SO0fcrgSdyfbcGqadGL7p2p1a6FwRftXQ-PEXOmOtjsRnaAJ6Wr4L-Dn4bEG5IA1TSUGlPZATIWa1O4-WNWc5Ic13-cxQ-xlwmMi_nCmwC_YAZhImRazhsAfJnE1b8b8eC3sC2yoj58mhuS5OrDb4uDrmheSffIxvRJX0DPcG3ByjE-u5HLJgEDetPcTgSH7Gn8WnwHEX1Hn2HuQT3xWUSP"
                      />
                      <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                        +18
                      </div>
                    </div>

                    <button className="bg-gradient-primary text-on-primary px-6 py-3 rounded-xl font-headline font-bold shadow-[0_12px_40px_rgba(0,6,102,0.15)] active:scale-95 transition-all">
                      Team Hub
                    </button>
                  </div>

                  <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-primary/5 rounded-full blur-3xl"></div>
                </div>

                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-3xl">
                        sports_volleyball
                      </span>
                    </div>
                    <h4 className="font-headline font-bold text-lg text-primary">
                      Vortex Spikers
                    </h4>
                    <p className="text-stone-500 text-sm">8 Active Players</p>
                  </div>

                  <button className="mt-6 w-full py-3 bg-white text-primary text-sm font-bold rounded-xl border border-stone-200 hover:bg-stone-50 transition-all">
                    Team Hub
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-lg font-bold text-primary">
                  My Tournaments
                </h3>
                <span className="material-symbols-outlined text-stone-400">
                  more_horiz
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-primary">
                        Global Elite 2024
                      </p>
                      <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                        Quarter Finals
                      </p>
                    </div>
                    <span className="text-xs font-bold text-primary">82%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tertiary-fixed-dim rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-primary">
                        City Championship
                      </p>
                      <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                        Registration Open
                      </p>
                    </div>
                    <span className="text-xs font-bold text-primary">45%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-primary">
                        Masters Invitational
                      </p>
                      <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                        Winner 2023
                      </p>
                    </div>
                    <span className="text-xs font-bold text-primary">100%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary-fixed-dim rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-primary text-on-primary py-4 rounded-xl font-headline font-bold shadow-lg active:scale-95 transition-transform">
                Register New Entry
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}