import React from "react";
import { Link } from "react-router-dom";

export default function TeamsPage() {
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
            className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1"
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
            to="/teams/create"
            className="block w-full text-center bg-[#10207a] text-white py-4 rounded-xl font-headline font-bold shadow-lg active:scale-95 transition-transform hover:bg-[#0b1760]"
            >
            + Create Team
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-grow min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 w-full h-16 bg-stone-50/70 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <span className="font-headline font-bold text-xl tracking-tight text-indigo-950">
              Teams
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
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8IQh4g_ApaCcGzoNDRfk9XjybHdlG6cDzIuX716crYugeEtFbddBrbgQc4Fc6QQO3Ek-EtKFZCxxFCYUW4TZNuSNEAP1Lbhr4BflAdU_J08C0JxfiAoaV1FoeeZwR1J7uirLmxaBhceS-sIcSyfgpVexjRbhNPDb8PxabX3hzMk90DUM1WWX_tDVHPAWxGVYSn2-SPrVuqYukkNWqSsaljjvkXoXlgtD58p5gxmV7GQSRvzuRF-AUSKtaWgId1c8xLmm45SmjxWGM"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto space-y-8">
          {/* Hero */}
          <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Team Hub
                </span>
                <span className="text-stone-400 text-sm font-label">
                  8 active rosters
                </span>
              </div>

              <h1 className="font-headline text-5xl leading-none text-primary">
                My Teams
              </h1>

              <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-3xl">
                Manage your active sports teams, track roster health, and review
                recent franchise activity.
              </p>
            </div>
          </section>

          {/* Top cards */}
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-8 flex justify-between items-center relative overflow-hidden shadow-sm">
              <div className="relative z-10">
                <span className="text-xs font-bold text-primary/70 uppercase tracking-widest">
                  Seasonal Performance
                </span>
                <h3 className="text-3xl font-headline font-extrabold text-primary mt-2">
                  Elite Status Unlocked
                </h3>
                <p className="text-on-surface-variant mt-2 max-w-sm">
                  Velocity Strikers currently rank in the top 3% of regional
                  football leagues.
                </p>
              </div>

              <div className="text-right z-10">
                <div className="text-5xl font-headline font-black text-tertiary-fixed-dim">
                  94%
                </div>
                <div className="text-sm font-bold text-on-surface-variant">
                  Win Rate
                </div>
              </div>

              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-20 -mt-20"></div>
            </div>

            <div className="col-span-12 lg:col-span-4 bg-primary rounded-xl p-8 text-white flex flex-col justify-between shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
              <span className="material-symbols-outlined text-4xl">
                emoji_events
              </span>
              <div>
                <h4 className="text-xl font-headline font-bold">
                  Next Tournament
                </h4>
                <p className="text-blue-100/80 text-sm">
                  ProLeague Summer Cup starts in 4 days
                </p>
              </div>
            </div>
          </section>

          {/* Team cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)] group shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTkz1Ag27wKVYqNRCYR_pkAPdalC_R-Gk_brdfGBWgBE6r1JEtR1L4go1amzjcMTrzcy4qQn75tBO6XskT6iXawlvAlTV2dgRFAepqH4VKW2OPlJ0PfW75s_QcFLUafJ3nNnSO6lSQuJ4mKjU3OGra9dd_yvGM-xbRnOVXZEkbCCxbrpqxru3gxt0WXouAhehpZuIC7e3MzJXw-NfaNvK-VwoIDw-ALNdHQlna6Pu4DGpWGOsO-uQbMsfr87XjKFejuzsfbGKXb5A7"
                    alt="Velocity Strikers"
                  />
                </div>

                <span className="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <h4 className="text-xl font-headline font-bold text-primary mb-1">
                Velocity Strikers
              </h4>

              <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
                <span className="material-symbols-outlined text-lg">
                  sports_soccer
                </span>
                <span>Football</span>
                <span className="mx-1 opacity-30">•</span>
                <span>24 Members</span>
              </div>

              <div className="flex -space-x-3 mb-6">
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBOqmpMEaanBTDrYTs7ERAHZ-1FwgkmKFgG6wO8p9X5q26m3uvYZ5xpV9uzpfca8YG5p8YT9RcplZyZqRWIZ3O9A91vHneZAbewmBolo-afhD405pbERzhpu8M9jfw9gTBlR2JWSKDydFX9WzoqSHy470NDtDNbZ_V2Gr2AOg7JIvraJNWPUYjSOj6eWtRsgLzzB3ticfH64obujwWRQdlfWL-hiLiZrAnIcCtiotLVtBRvUcTTVSARIQf-zmRTewlRO0JFzs4dYQ0"
                  alt="member"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGXN0rorWJSiK1Me9Z7osfeO7o2xrlZSYwJfsiezC1spjWN_UA9C_5gvgdCWo6UjwIHQTF0utorMRNHUKzPn6eX1_0LcJ2B1Vim2hD_r4EBOXbIMSIKKaMr8uq9Ix1EPECMnKiiXVBSpgRFgjmArKz-pX52EBp1d1LXhhLPEL7_06WDJehu6JfwCzBIgy1v-_bpovyWueZdt43tsQ7FnMcjSNFVRoJc--JWRJCDsiWg1E8t9phwD_GuvS7DfYbwldgyzrocFbXr274"
                  alt="member"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FnM600DLNwv2NW2ORTU5W79V26QJADQdDrImgFTpBB-2s_QU_O3zfUINrb-sI9TIzK7QmJnTrAQNSlFo4wFTFl813pFasMXZy5fRe9BUJXegbymEeXkYDViYTOEroAbQnMB4R8nNmnUizu_GcjS-m3z18DssINdlRC3TtbmkRdogUWC52ZnvWW-Jz9n0QIOHt4M_IY3a44LRL8cpickwLD6PEYiUXf9VwIKTVR_lPTdvu23N3rTqSiW4QgnyBB5MEHXRcFajkuvK"
                  alt="member"
                />
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container text-[10px] flex items-center justify-center font-bold">
                  +21
                </div>
              </div>

              <button className="w-full py-3 text-primary font-headline font-bold border border-stone-200 rounded-xl hover:bg-surface-container-high transition-colors">
                Manage Roster
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)] group shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBllas7VVt2j6oK0aD8Bac7U9YdpMll6fcPxjuDNYcLBYw-sVCBnM_yl9w8g5B5vizEoFPUgDMx2Nk1wppAp3lA-KEXvjQz3oj0mU4BjkGEUAp-pQwNPhxtKXLyGGEaTV-QdhC_WEPpxkBPMA_--0k2937oRIJiyD8MUYp0qqdPkE89eilRoVW7DI74lVQMrZ1kefD0Ui1bGPOGqp-s6WiAbA-EZ41e5xaANHMR4YA1_LHCKZzwc4uis6QjlxzOO4JtwEbqjDZT6YSO"
                    alt="Thunder Bay FC"
                  />
                </div>

                <span className="bg-primary/5 text-primary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Off-Season
                </span>
              </div>

              <h4 className="text-xl font-headline font-bold text-primary mb-1">
                Thunder Bay FC
              </h4>

              <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
                <span className="material-symbols-outlined text-lg">
                  sports_basketball
                </span>
                <span>Basketball</span>
                <span className="mx-1 opacity-30">•</span>
                <span>12 Members</span>
              </div>

              <div className="flex -space-x-3 mb-6">
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf2lCiCUvf2VvzYSCqejiRs0NxdaQdgxVQnxs4FIIvQ84VOHi45K1Kv0PAY5yNJQYVJhzDqBqxqcnwz_yWVA68eYyGkFW3f1xc4vXJydvIcosC5fzSnExBEYeyKNp8qgV5d5fdwiqfHk2H8OnnOieP5r_u1sGGjK810W_1upe-jp07KvG9IaB8j0g_Wp8sw7L4U9DPHalg8cszyM1Xge4aIJYnZDlPuqytkHdEVT14jtnlrACAWamlRZbc4psAMHxlD0oJZVrVFkeR"
                  alt="member"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzNkzxsz1oRX_fRDCy5Ioz-CVwFd5da8ExFdKthquA7gVvNpauM9rto7vyi5Qew--RWobQc45cfrf4_5NQ0wPPMl9TDLOZXw9Ub6KV5vhBDwnEBPMgIKqyb9M28hnmuWV8IKUdomfqkjUBalVcb8gb3WWs8iE_iXcUNw_f92n3EXIAulyqsGA8OiR0NOSMgDzPg2aDFcdjsWMahf-Syw4MUTeLIyaOzoPlc_dh3NAjmyAH3LwXbOQdwoIagdkOYAANhp_M0aKRYnTS"
                  alt="member"
                />
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container text-[10px] flex items-center justify-center font-bold">
                  +9
                </div>
              </div>

              <button className="w-full py-3 text-primary font-headline font-bold border border-stone-200 rounded-xl hover:bg-surface-container-high transition-colors">
                Manage Roster
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)] group shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDznXWLIg-nGAEInAqifTMvGM4bMYtgWLHQcQFWReEI4VXgiv19bgKybEZjr2VvHz21qq3SqyuXuKzhoexwY7oljs4o1aIB8sK-EvoM6gvy-ifvXqi0TfAhGIGOxNQX9huXUM314hOmZmvbeYlQzlCt2hS-hfVT5uVg8jfhta_93UE1unDw5kBH7TLslf6HHH7WiYOfyEe7D8OnvGIY1DPCUOx1Ft4_aE7JhgKHBHzzhSwXgUlvqKDcLm7HjBajJDSwVxmfImalPhhT"
                    alt="Apex United"
                  />
                </div>

                <span className="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <h4 className="text-xl font-headline font-bold text-primary mb-1">
                Apex United
              </h4>

              <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
                <span className="material-symbols-outlined text-lg">
                  sports_soccer
                </span>
                <span>Football</span>
                <span className="mx-1 opacity-30">•</span>
                <span>22 Members</span>
              </div>

              <div className="flex -space-x-3 mb-6">
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgJ4E5MTlaFZX7ssNYbYRYk3xZgzIKyYjGozwX5RQsZdZk8mfPJqbp7uccFXZjnU8I7JWZiWIURkK8o1j8ytIiU5NSskT1Vaustor0f07fZ4Ks-9FyI99uLFxBUaMFMZHTTLZmkD3v2Lfw7T4_xQJ63Qhf2_Pp3V-7QLf90C9xGMo9H9p7wOZiAlXsCUcW3x-pn1Ytj9tD540uFTo6c_iHdnGBxWx7ia_8DkJw6FNZ_Hl-IH1ova_eknifb5YfQMLdloCFGjM6OJy8"
                  alt="member"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7J9Y8DECPIc5Y1QrsXVmCFkmhg6tAOFcwfw7DWiZILXI6ex5vQzHBZHgByt4et6R189K0EoeOsZgtuDTIvx1s0wFO-6Zb27tjyk6pv5C9-I0RK7JYBOe7mg5PF_lVfpD5IMKtozQxUDswiB2dcQnWUF1H9yntcLNozWXKZE2_FpwN9qttlmDxpuWWtR2FJYG-5oOtPTuW8UCeljH03kfIIAoVtlcmRHgb8hJKLVL7uGIH6GH5Vuz9WTR2jFe-bB-u09wyS84IpUx8"
                  alt="member"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5urZhZyF0PPsfOvqT9zS0su4JnG08T_QGSIoAnhBAw7CbD9qtOhcAf2VdNajf8U67NaxzCKIo57g5KSVCkT7BntEB2QWrBJ9jyi2uP0VshfLUTdvBEYCoz_A4x5E-flf5BaD7lIy0uwoMKTZFAUzR_GoojVbBBQF9D0pdkqhX0bCNLKGOjbDfOmBFc6s4Ds7v5F7teVyzfj-XeSGEfBDh5MsF8Q8xFtq2NZqPIvsRZn0rmmjhb9wDQL9Xrz7XFq0djZHXGeIfxvD7"
                  alt="member"
                />
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container text-[10px] flex items-center justify-center font-bold">
                  +19
                </div>
              </div>

              <button className="w-full py-3 text-primary font-headline font-bold border border-stone-200 rounded-xl hover:bg-surface-container-high transition-colors">
                Manage Roster
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)] group shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0XR9n33ABqYULnOzYBvYal-5-ahJySHBOujv2Hy2s6LAdMqgIwOLLcOZIZlILmzYLcsH6MWEQ70da1NxXmSurGtxF2eOe7k78YFP0l4OW8NqnlIzurdwFWrXErbLKjJlkAmaLoofdQRUPY6F93FhmaeFuhQTGvUiBDkRmhaM9797BbHLtAOlzycO8PRg8jx0yntjGvwq-AFlCrbjYuZunP7C9nLLH41P0oxIneUis8vrLytQgkv0AsPvtEEKvGz0xXQ_T5rMZV6Cn"
                    alt="Ridge Raiders"
                  />
                </div>

                <span className="bg-error-container/40 text-on-error-container text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Needs Players
                </span>
              </div>

              <h4 className="text-xl font-headline font-bold text-primary mb-1">
                Ridge Raiders
              </h4>

              <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
                <span className="material-symbols-outlined text-lg">
                  sports_basketball
                </span>
                <span>Basketball</span>
                <span className="mx-1 opacity-30">•</span>
                <span>8 Members</span>
              </div>

              <div className="flex -space-x-3 mb-6">
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUpYwylra2dM5zr-cYPE-s0JU_QhrH1rf3h77W-Gri6-N69whtoinRz8j2qfXbf_X4uGn2NgfEn5sTDmHiePIi--bm8ICkyhIzi8bGEwLV1e12F5fm4qxgh79QOZIRhU7O_gC1u-O9DMMkzGlHxn7IqLgBuELVhnj5bxk319i8b2QpjeiuD-OA1G5cW7KxbDDIrliMhJb7aqErqXSE_wGa7kWEDlyXgdvLxeHjtbDKIHs7ufE75LNquwm1hS1NOm92l4jBZqlWM0gs"
                  alt="member"
                />
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container text-[10px] flex items-center justify-center font-bold">
                  +7
                </div>
              </div>

              <button className="w-full py-3 text-primary font-headline font-bold border border-stone-200 rounded-xl hover:bg-surface-container-high transition-colors">
                Recruit Members
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,6,102,0.05)] group shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQdgEV8imDLMOFE9qYFcSKEqKgWRzdk0LsL3thEP92txxlMVQTzyJQiZbSmYHF0fBjEhst6RFs421ca4mldsbjoPrSnfr3RA5WDX_lxmkAXDCbdJTm6hGIuTGzjrS-fUK8pjorCBC0MYu8ewFtXUvDXwkRyycE3vmT4LxWsxPMguG-uRt-OkcSNxoP6Mvyl_vGAdTudWD9P3Pqfb3olj12MejXcAO2nDocmVlLFTKQUzydHyF4vUad_yqKymy_9EwnTnaIP-68irYp"
                    alt="Sky High FC"
                  />
                </div>

                <span className="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <h4 className="text-xl font-headline font-bold text-primary mb-1">
                Sky High FC
              </h4>

              <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
                <span className="material-symbols-outlined text-lg">
                  sports_soccer
                </span>
                <span>Football</span>
                <span className="mx-1 opacity-30">•</span>
                <span>18 Members</span>
              </div>

              <div className="flex -space-x-3 mb-6">
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPhFizkEv4xSBT4HGPyIYBlro42k07RVwHDrRlYLyqrk9qA1Djm357hT01ijK6i7TfNt0p9R9pkimdlsMVj-eX8g3DrwOvf_wIAyHTvg1t8ThgcIGGGoX9trQD8oqPqzBs3tEO6d039NQRS_rJWJZYzSEe_TpPjZdAZvljzC0tgarl-U4cC1q0jWDhV8X-smOjMuTkwPwcu3EEpm_BA3m4nEox9l2s0pbKv4TKne43f3OzH3EYgd96m3c89PUZj2f6OILiQfTnSCgG"
                  alt="member"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkfCezxOGTkgQP_wyZyHG_f9guVPu78w7u2txFHI33MWwD43zTRwzhZwOwMIhRJSkN-8VYhb3ssFuw2OoL13ZBWsOjXvRHmk6dOA7Oj2UZEGF8Eiqk_KdIM90fi-1VG4esqq45kNKIv0qjswaJiPL-J4aMkdWxqFtlPGcmsXUowBEH_ldpLddrxh5rk_A1piS7aI5tlDufor9j9BMOOjrFCQDNeE-4Jn5NaICvNu9uTcQ92Nv5No-LmZk6FGCDV6Fuf7o6yq9yg6zO"
                  alt="member"
                />
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container text-[10px] flex items-center justify-center font-bold">
                  +16
                </div>
              </div>

              <button className="w-full py-3 text-primary font-headline font-bold border border-stone-200 rounded-xl hover:bg-surface-container-high transition-colors">
                Manage Roster
              </button>
            </div>

            <Link
              to="/teams/create"
              className="border-2 border-dashed border-stone-300 rounded-xl p-6 flex flex-col items-center justify-center text-on-surface-variant hover:border-primary/50 hover:bg-surface-container-low transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <span className="font-headline font-bold text-primary">
                New Team
              </span>
              <span className="text-xs">Expand your franchise</span>
            </Link>
          </section>

          {/* Recent activity */}
          <section className="bg-surface-container-low rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-headline font-bold text-primary mb-6">
              Recent Franchise Activity
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl transition-transform hover:translate-x-1">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-tertiary-fixed-dim/20 rounded-lg">
                    <span className="material-symbols-outlined text-on-tertiary-fixed">
                      person_add
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      New Member Joined
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Marcus Johnson joined Velocity Strikers
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                  2h ago
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl transition-transform hover:translate-x-1">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-secondary-container/10 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      Tournament Invite
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Thunder Bay FC invited to Regional Open
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                  5h ago
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl transition-transform hover:translate-x-1">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary">
                      edit_calendar
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      Training Scheduled
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Apex United practice set for Saturday 10:00 AM
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                  1d ago
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}