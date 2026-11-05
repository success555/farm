import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
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

      {/* Main Container */}
      <div className="max-w-md mx-auto w-full my-8 bg-white rounded-3xl p-2 shadow-2xl border border-farm-800/40">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
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

      <div className="text-center text-[11px] text-slate-400 max-w-md mx-auto">
        &copy; {new Date().getFullYear()} Doutare Agro Farm Limited. Account creation subject to admin approval.
      </div>
    </div>
  );
}

