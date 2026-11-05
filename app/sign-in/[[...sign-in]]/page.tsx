import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { ShieldCheck, Sprout, ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#072413] via-farm-900 to-[#051c0f] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition bg-farm-900/60 border border-farm-700/60 px-3.5 py-2 rounded-xl backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Farm Store</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-bold bg-farm-950/70 border border-farm-800/80 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4" />
          <span>CAC RC: 9563075</span>
        </div>
      </div>

      {/* Main Portal Container */}
      <div className="max-w-4xl mx-auto w-full my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Brand Welcome Card */}
        <div className="lg:col-span-5 text-white space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-farm-800 text-gold-400 flex items-center justify-center font-extrabold text-2xl border-2 border-farm-700 shadow-xl">
              DA
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight leading-tight">DOUTARE AGRO</h2>
              <p className="text-xs text-emerald-400 font-semibold">Farm Limited &bull; Delta State</p>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Backend Staff & Merchant Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Authorized farm managers, agronomists, and wholesale dispatch supervisors sign in here to manage harvest orders, bio-treated sucker inventory, and riverine boat manifests.
            </p>
          </div>

          <div className="bg-farm-900/80 border border-farm-700/70 rounded-2xl p-4 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <Sprout className="w-4 h-4" />
              <span>Ayakoromo Central Operations</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Burutu LGA, Delta State &bull; Waterway Cargo & Haulage Manifests Active.
            </p>
          </div>
        </div>

        {/* Right: Clerk Sign-In Component */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl p-2 shadow-2xl border border-farm-800/40">
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary:
                    'bg-[#14532d] hover:bg-[#0f3d24] text-white font-bold text-xs py-3 rounded-xl shadow-md transition',
                  card: 'shadow-none border-none p-4 sm:p-6',
                  headerTitle: 'text-xl font-black text-gray-900',
                  headerSubtitle: 'text-xs text-gray-500',
                  socialButtonsBlockButton: 'rounded-xl border-gray-200 text-xs font-semibold',
                  formFieldInput:
                    'rounded-xl border-gray-300 text-xs focus:ring-2 focus:ring-emerald-600',
                  footerActionLink: 'text-emerald-700 font-bold hover:text-emerald-800',
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[11px] text-slate-400 max-w-md mx-auto">
        &copy; {new Date().getFullYear()} Doutare Agro Farm Limited (RC: 9563075). Internal system access is monitored and logged for biosecurity and financial compliance.
      </div>
    </div>
  );
}

