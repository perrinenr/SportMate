import React from "react";
import { Link } from "react-router-dom";

export default function TeamDetailsPage() {
  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen">
      <aside className="h-screen w-64 fixed left-0 top-0 bg-stone-100 flex flex-col p-6 gap-8 z-50">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline font-extrabold text-2xl text-indigo-950">SportMate</h1>
          <p className="font-label text-xs text-stone-500 uppercase tracking-widest">Management Suite</p>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            
                Dashboard
            
          </Link>
          <Link to="/matches" className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1">
            <span className="material-symbols-outlined" data-icon="sports_soccer">sports_soccer</span>
            
                Matches
            
          </Link>
          <Link to="/teams" className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1">
            <span className="material-symbols-outlined" data-icon="groups">groups</span>
            
                Teams
            
          </Link>
        
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1">
            <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            
                Profile
            
          </Link>
        </nav>
      </aside>
      <main className="ml-64 flex-grow min-h-screen">
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 w-full h-16 bg-stone-50/70 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <span className="font-headline font-bold text-xl tracking-tight text-indigo-950">Team Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95"><span className="material-symbols-outlined" data-icon="notifications">notifications</span></button>
            <Link to="/settings" className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95"><span className="material-symbols-outlined" data-icon="settings">settings</span></Link>
            <div className="w-8 h-8 rounded-full overflow-hidden ml-2 ring-2 ring-stone-200">
              <img alt="User Profile" data-alt="professional headshot of a sporty young man with short hair and a confident smile against a blurred stadium background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmE55lczLYnn9Gdd_jX1DzSF_c0yCoTK6hMcF4-AGfhTYqKJGBR5BaixuVsm9tmzWFfmWzUDYrSnykUIfs-wLxJWL0j9LjI_OjTiYJATbEXd1Dod1-togNb2y05EIsGpY25HyWxeuE9mDSBBQ5Gm8bw3s3YykXJIFewRTgSsqJd3QSHlVt9MKEkFsms9Kc9ZX_0WWzVLIkbMsLkvA1vv-l9IZqQbwOb_Eb0vjCzoUMkXie_cCLLH4i3QkSu6u4RHYwRh4P7aq2GSJG" />
            </div>
          </div>
        </header>
        <div className="p-12 max-w-7xl mx-auto space-y-12">
          <section className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Active Team</span>
                <span className="text-stone-400 text-sm font-label">Est. March 2021</span>
              </div>
              <h2 className="font-headline text-display-lg leading-none text-primary">London Strikers FC</h2>
              <div className="flex items-center gap-6 text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-600" data-icon="sports_soccer">sports_soccer</span>
                  <span className="font-label font-medium">Soccer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-600" data-icon="location_on">location_on</span>
                  <span className="font-label font-medium">London, UK</span>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex justify-end pb-2">
              <button className="block w-full text-center bg-[#10207a] text-white py-4 rounded-xl font-headline font-bold shadow-lg active:scale-95 transition-transform hover:bg-[#0b1760]">Join Team</button>
            </div>
          </section>
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-4 bg-surface-container-lowest p-8 rounded-xl space-y-8 shadow-sm">
              <h3 className="font-headline font-semibold text-stone-400 text-sm uppercase tracking-widest">Team Composition</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                  <span className="font-body text-stone-600">Current Players</span>
                  <span className="font-headline font-bold text-3xl text-primary">14</span>
                </div>
                <div className="flex justify-between items-end border-b border-stone-100 pb-4">
                  <span className="font-body text-stone-600">Required Players</span>
                  <span className="font-headline font-bold text-3xl text-primary">22</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-body text-stone-600">Open Positions</span>
                  <span className="font-headline font-bold text-3xl text-tertiary-fixed-dim">08</span>
                </div>
              </div>
            </div>
            <div className="col-span-8 bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <h3 className="font-headline font-semibold text-primary text-xl">Philosophy & History</h3>
                <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-2xl">
                  
                            London Strikers FC was founded with a singular vision: to cultivate elite athletic talent through a culture of relentless precision and kinetic energy. Our history is rooted in the competitive urban leagues of East London, where we've built a reputation for tactical superiority and unwavering team spirit.
                        
                </p>
                <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-2xl">
                  
                            We prioritize data-driven development and fluid playstyles, ensuring every member of the roster contributes to our collective momentum.
                        
                </p>
              </div>
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="font-headline font-bold text-2xl text-primary">Current Roster</h3>
              <Link to="/teams/details" className="text-primary font-label font-semibold flex items-center gap-1 hover:underline">
                
                        View All Stats 
                <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 transition-all hover:bg-surface-container-high cursor-pointer shadow-sm">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-fixed">
                  <img alt="Marcus Chen" data-alt="close up headshot of a focused young man with dark hair in a sports jersey, neutral background with high key lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCotz9CxcvaoNmboyCdCUTP-QfYlhSUDdSNnvU3DouZyPbY6QXz2aDViNfFkX8GQa8pxjlRkvyWrRt5Si4yUrF4BEXOVG-gb6pLuQkbtW_JUOLycMDraBOhNxO5ZiTTiGha34xwiPwboGjMHJepauaMHqN44u8hAfIZAagRIw69V2jdfPfvJcCfbxT716ykkpUTxiX8n3bIk30NfyGidERotFSYCE2HJ6eKm8YFtbN6POeLfPB0nifOUH1RfxWWBPs_Mw0d0qx3BHB" />
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Marcus Chen</p>
                  <p className="font-label text-stone-500 text-xs uppercase tracking-wider">Captain / Midfield</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 transition-all hover:bg-surface-container-high cursor-pointer shadow-sm">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-stone-100">
                  <img alt="David Wright" data-alt="portrait of a bearded man with an athletic build looking sideways, dramatic soft lighting on a gray studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcLmKaIxB5Dl8fGDCUByGzOasH--KWIU8aPxs93ULJgHyGn_66-9IswRNymhO3XFXwlMQdZ_LINXnO8_OVHqoSt_IMdtfF07yWjGlLYOeciVLwpCmP12UXv_4kk28knX0f3Pr3E4UupA3I8mCVp5oPw0Uve_dE3iPOZdhCpRgFY4Z1wXH-llbZd2pDJilfdjOilk97IyIY9etpjdLwaexHosGEZtfVvWSr37zpbzQRB_QESCYZ0SflJW1DYKeVfxJrVd_fqS7G_wK8" />
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">David Wright</p>
                  <p className="font-label text-stone-500 text-xs uppercase tracking-wider">Forward</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 transition-all hover:bg-surface-container-high cursor-pointer shadow-sm">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-stone-100">
                  <img alt="Sarah Jenkins" data-alt="close up of a determined woman with hair tied back in a ponytail wearing activewear, soft natural morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP2iuQ_u5hCSNX8qGczfX2feKN_hTiny04zE8SrjnW7ONjSdO-2aY1NUT5BmW11-JLRJOPtzWPXaZMviYMNEHNy_kIWFB-ZN8SNlRhNxXrQPY7SmK9aIOQ88YMH0nr4Vd7McqgWgeiRveUs_ObNBtCZB3DcDfK1yO2pv6cmOxfTg5xZjaZIhI3OjED_0lf8AaPkkn0NhnGigwRs978CutJC92s31k_xWc7EMwee4BOuyt0hbvloUS6f8WPe5nQQX_mwJQ85i6El9hP" />
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Sarah Jenkins</p>
                  <p className="font-label text-stone-500 text-xs uppercase tracking-wider">Goalkeeper</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 transition-all hover:bg-surface-container-high cursor-pointer shadow-sm">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-stone-100">
                  <img alt="Liam O'Connell" data-alt="headshot of a smiling young man with light eyes and curly hair, vibrant cinematic lighting in an outdoor setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHd6r4pgllvZeV0OqHqnwycpR4H_FUArgfwz4KI6Zy3J67ISwoA115BwRE3rCFuByGy88-e3X9imu0UwVQ9w-nBfX8Ehs6MOHH943JvMbgo_4ARFAXZ9cvpPJ5KzHG1VwxMlvLK3ROIhNtwuP9WyRbMV1qSp3_kScgQMXQ_6K1hsVAf6hkzwLG7N8xUvG-916v4SKt2SS-bmm7qSyRUlN8xjRszTVf7VWSU1_ppdY9eLHlpVGN96LIiM1MLvOu0WSSUTJAk9xxWBBE" />
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Liam O'Connell</p>
                  <p className="font-label text-stone-500 text-xs uppercase tracking-wider">Defender</p>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-8">
            <div className="bg-surface-container-low rounded-2xl overflow-hidden h-64 relative">
              <div className="absolute inset-0 bg-stone-200" data-location="London, UK" style={{  }}>
                <img alt="London Map" className="w-full h-full object-cover grayscale opacity-40" data-alt="aerial stylized map view of London city streets with the Thames river winding through, monochromatic blue tint" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtOTqNnQ74iVFnRGRgXcgQLKOTO3Ev5K2L9Fge-psBJn_FhiNc7ZAvXqIcgPiHpZByoRUZCQ_uqBUlEsA03Sg46kZw5lczYytZZ2rFIQz0Qd9Gm6gbEhn94oGCNT7k9jLk51e11exXnVw7F04HLObfnFhoVwYEyWT2KcoVtAB5cPH6MJpxwFjmmhMYiIkUJLKuQlu2mYrDx_MSp6BT0TO6pgfVEcWMKC_xzAfJPplEoFWhcyQNvKkupIKAhsFVOASOX8bU156i16wr" />
              </div>
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
                <p className="font-headline font-bold text-primary">Hackney Marshes</p>
                <p className="font-label text-stone-500 text-sm">Primary Training Grounds</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
