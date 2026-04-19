import React from "react";
import { Link } from "react-router-dom";

export default function MatchDetailsPage() {
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

        <div className="mt-auto">
          <Link
            to="/matches/create"
            className="block w-full text-center bg-gradient-primary text-on-primary py-4 rounded-xl font-headline font-bold shadow-lg active:scale-95 transition-transform"
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
              Match Hub
            </span>

            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-stone-400">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input
                className="bg-stone-100 border-none rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 w-72 font-body"
                placeholder="Search matches, players, or venues..."
                type="text"
              />
            </div>
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
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFgtAhvRhruFeyH6n843BKn2RqtRVPMqvEAL787Low91nZjN0JvJHl5SfriSWxlJMmkdmz0bBb1z0qO9nV1tJh2VvKiLLZ5dZnlCrt1MLmbnH0IdoeysupS30w9SlBi4GpEulj5teSZndZNOkUxDszDdywZ4bP5Oz_mYKDHmG7Ix-3hIj2VeeVhVpXR5EIgJflLVKFIO-ig0WYlaYzmB7Tc86lhpCXqZA0Qu0luJgRWzYsDOj35OKU1xJzoGi29Uv1O43iL0Z4sqHj"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto space-y-8">
          {/* Hero */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Intermediate
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Soccer 11v11
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-stone-400">
              <span>Matches</span>
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
              <span className="text-primary font-semibold">
                Sunday Morning Premier Scrimmage
              </span>
            </div>

            <h1 className="font-headline text-5xl leading-none text-primary">
              Match Details
            </h1>
          </section>

          <section className="grid grid-cols-12 gap-6">
            {/* Left */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
                <div className="h-72 relative">
                  <img
                    alt="Soccer Field"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Q4NOyar5b3HmwWNcO8lIykX9W1yMSLBe8mYrCNNxad5g2tjXuiXGsn6ixgQOsL98Htt5UUCV94gHsIdQ3TQ4oIgJXA-hy1W_8vaGSZ4k1O3jo00I9ju675W0Q7sFhIASbOVomjMkV_k8-PlamR8zndZzj0agJlDYoWbh15r-y_JkmO6iMXDHLs1k60PuLzVHgHVp-jvCmIsVb0o99qt2RSyKH0UMffpDEPj2wED9Kti0ZGKG5Fb0rsnylxVhRpGAZGKbmdWiWoAA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>

                  <div className="absolute bottom-6 left-8 text-white">
                    <h2 className="text-3xl font-headline font-extrabold tracking-tight">
                      Sunday Morning Premier Scrimmage
                    </h2>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">
                        calendar_today
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                        Date
                      </p>
                      <p className="font-headline font-semibold">
                        Oct 24, 2023
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                        Time
                      </p>
                      <p className="font-headline font-semibold">
                        08:00 AM - 10:00 AM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                        Venue
                      </p>
                      <p className="font-headline font-semibold">
                        Starlight Arena
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">
                  Match Brief
                </h3>

                <div className="text-on-surface-variant leading-relaxed space-y-4 text-lg">
                  <p>
                    Get ready for a high-intensity session at Starlight Arena.
                    This is a competitive scrimmage designed for intermediate to
                    advanced players looking to maintain match fitness and
                    tactical awareness.
                  </p>
                  <p>
                    We provide bibs and water. Please bring both firm-ground and
                    artificial turf boots, since the pitch may change depending
                    on weather conditions. Arrive 15 minutes early for warm-up.
                  </p>
                </div>
              </section>

              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">
                      Participants
                    </h3>
                    <p className="text-sm text-stone-500">14 of 22 spots filled</p>
                  </div>

                  <div className="flex -space-x-3">
                    <img
                      alt="P1"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-QjuN-DYnzj5WMRSKtM2MZaPXtpovssLHBZ9H2n-6u9BjplEa4X1D6HGw1YkRljJOhgBC6DG4fORiqUmRU96ByOQorSGyF_TsR5RVAflCiJ3AG4yW7z3lPGKLGNO_WlbyiUirQEwMZ4lYNJv_DSY8zITS03qHLz4Rr5fzuew3-UVG_c3YdCOGrqSmXF8rmcczzgXS5ZdSyFr_ISeX0S3KLfzkFMeZrPnxcZJVb6XNlKwj4bpkfvYI4LVJpHJ5wv-c8_XW9qmZrjwh"
                    />
                    <img
                      alt="P2"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkSPXMiFWh-DooXizYWxzU9FIu-mzZhS8s8_edlR8Xw3-3_nupV9of1cJ4xy60uWVy2GbkCl5FMx6jE9EBN7lPNspuC8-eOlxgyVaAWEQBwp73EcVzT9saPaQP0x4350eaLuzOR5YvljiIT6Wxb7iacfgCqwxqAwgl5AHZl6aYEaVdW1qHwOhVn1HTe5ix5BpZDIKqPhdO8YiBs1uWyNmY4fdsxXoCuWx68kk8uiB-Arui1HUfZZGVuX92YL5mpB_wniFCVEhN4cEr"
                    />
                    <img
                      alt="P3"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIo9aAVF4hwQIfNeOHrLp6LIXrqdgX2b8HJ1LyEa1p03aGV_SE_unO1Vw3Wjuw-ef4VWpOGEPrJXJLngFVkj6Xk-JivhWMVxuRTqBV0jbvs71oOLD33eGcnhl9wbmUxOMwKs-FfY-e-TP3V7e0gNNd2n74HwHMOBh88xsoiiLVpbqoTo710fmJ-G-mJViCrfTo-fpfzhOgeBDbAmgt0GmiteOf3rSOVSmq9hMXP1nPqzex5DI68NAx1kVkPa6eQUu-FP_BG2-ICEIb"
                    />
                    <div className="w-8 h-8 rounded-full bg-surface-container-low border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary">
                      +11
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3">
                    <img
                      alt="Marcus"
                      className="w-10 h-10 rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiRqhIzKmZDoDHZ009uTwHp5v5dcHdZV6oF4u504pMkxocFj6owCrSMmPD9HB9soIHchggrt3HyM7qFVgpA4aOE1zwewG2mrmmNC32morKqzsdNEG3o7JvTY9-fys4_6EFdQc9z5ghOu-yntjsu8oTpcoEG-0iB-bG690swTFuvRc3IcH_iHhfuLK9nS2zEwyh741UbuDc2wN8b9GeoXgLJAzChWaJzyQsERjkGJYImKzhNHwic_S9SVAlKwqICcJlhgeZIm-pz37L"
                    />
                    <div>
                      <p className="text-xs font-bold font-headline">Marcus J.</p>
                      <p className="text-[10px] text-stone-500">Midfielder</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3">
                    <img
                      alt="Sarah"
                      className="w-10 h-10 rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2wsT_v1XawY5LeWfqkWyvOp_zUmf6gBSNAiaE5ltido9SB7gBDX32h2_4yYhqud3NZHrFnZY7xLK5Fm3DKGZPlkgF9ruwDMrucuel_GVtOEJXCcv3Pb8ERAkvdKD0TcImFBmR9viGU6iZ4Faa3EIi4VmfoES5APJk22We5ALcCUxNH4b9ufXL_pnHiad99scR_Y3L08XuGWH8r6nCDmmGtt9Y43pWftHp7R6eKmd8w6lL1pVyzCLOzynghOOB7XkPqxn8_5EBC9de"
                    />
                    <div>
                      <p className="text-xs font-bold font-headline">Sarah W.</p>
                      <p className="text-[10px] text-stone-500">Forward</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3">
                    <img
                      alt="David"
                      className="w-10 h-10 rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-E7o8jgNm3B730-m9WMwt0qjGBEATG_xlOLp3CpMbAxjlOsBEbY_w3ZRWRK7Ji8orVuJlxqkbVKyW3mlqwnJuTRMTkaQhkVkYBwq7lFQWZ9blMArLesG3KsNnlvHufazv00pWmQLlR2qe6x1XTf5chuSdEHMNJfjKtc-wabWmCv3kY_jk5kyXWVRcsFIvbzOtMQ3oWYwBe-NTR6lEejHgaaUu1AOSQ7k5KdEwxdhk_oC6n-CpybWc9iXlCZRb0qElZv2BLHq28Dwr"
                    />
                    <div>
                      <p className="text-xs font-bold font-headline">David R.</p>
                      <p className="text-[10px] text-stone-500">Defender</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-center border-2 border-dashed border-stone-300">
                    <span className="material-symbols-outlined text-stone-400">
                      add
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* Right */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm lg:sticky lg:top-24">
                <div className="mb-6">
                  <p className="text-stone-500 text-sm mb-1">Registration Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></span>
                    <span className="font-headline font-bold text-lg">
                      Open for Entry
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-stone-100">
                    <span className="text-sm text-stone-500">Skill Rating</span>
                    <span className="text-sm font-bold">4.5 - 5.0</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-stone-100">
                    <span className="text-sm text-stone-500">Gender</span>
                    <span className="text-sm font-bold">Mixed</span>
                  </div>

                  <div className="flex justify-between py-3">
                    <span className="text-sm text-stone-500">Pitch Type</span>
                    <span className="text-sm font-bold">Hybrid Grass</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-primary text-on-primary py-4 px-6 rounded-xl font-headline font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all mb-4">
                  Join Match
                </button>

                <button className="w-full bg-white border border-stone-200 text-primary py-4 px-6 rounded-xl font-headline font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined">share</span>
                  Invite Teammates
                </button>

                <p className="text-center text-[10px] text-stone-400 mt-6 uppercase font-bold tracking-widest">
                  Organized by Chelsea Football Club Academy
                </p>
              </div>

              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
                <div className="h-52 w-full bg-surface-container-high relative">
                  <img
                    alt="Map View"
                    className="w-full h-full object-cover opacity-60"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBROaFpmyDLDRp4cDRJRZrXQjr4VAIo0Z7lxS2FYGYIDPTXRhUpbCFEcSwfp7JvSeMugMSgyIW1ZbON_NddFgDZQwlCCDlXCqfSstnTi8KToueELHIBkbW8Ohky-HkxPDitMTUkaXr6sC7NW0L08eDJWWAZFAXe4qSVKvx-8_W6swV-XmdIDOvGPmWgFHKrEUAY5YCbEymEB4HroPhfvXBjZScObJintLPeTKDpRqqBY5EwmckY7Y6h2PHXeNo4v8EybLR61kbVspuw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full shadow-lg">
                      <span
                        className="material-symbols-outlined text-primary text-3xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        location_on
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-headline font-bold mb-1 text-primary">
                    Starlight Arena
                  </h4>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    24 Kinetic Way, Olympic District
                    <br />
                    Greater London, SE1 8NW
                  </p>

                  <a
                    className="inline-flex items-center gap-1 text-primary text-sm font-bold mt-4 hover:underline"
                    href="#"
                  >
                    Get Directions
                    <span className="material-symbols-outlined text-sm">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom info */}
          <div className="bg-surface-container-low rounded-2xl shadow-sm border border-stone-200 p-4 flex items-center gap-4 max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                info
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-primary font-headline">
                MATCH INTELLIGENCE
              </p>
              <p className="text-[11px] text-stone-500">
                Weather forecast: 18°C, Cloudy. Perfect for high-intensity play.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}