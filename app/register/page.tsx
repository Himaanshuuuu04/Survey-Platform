import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12 relative overflow-hidden">
      {/* Decorative gradient glowing circles */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Title/Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            Evo<span className="text-[#5C8EFF] uppercase">Rewards</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-450">
            Create an account to start earning points immediately.
          </p>
        </div>

        {/* Clerk Sign Up component */}
        <SignUp 
          path="/register"
          routing="path"
          signInUrl="/login"
          appearance={{
            elements: {
              card: "bg-zinc-900/65 backdrop-blur-xl border border-zinc-850 shadow-2xl rounded-2xl w-full",
              headerTitle: "text-white font-bold",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton: "bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-white font-medium",
              socialButtonsBlockButtonText: "text-white",
              formButtonPrimary: "bg-[#5C8EFF] hover:bg-[#5C8EFF]/90 text-white font-semibold shadow-lg shadow-[#5C8EFF]/25",
              formFieldLabel: "text-zinc-300 font-medium",
              formFieldInput: "bg-zinc-850 border border-zinc-800 focus:border-[#5C8EFF] text-white focus:ring-1 focus:ring-[#5C8EFF] rounded-lg",
              footerActionText: "text-zinc-400",
              footerActionLink: "text-[#5C8EFF] hover:text-[#5C8EFF]/80 font-semibold",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-[#5C8EFF]",
              formResendCodeLink: "text-[#5C8EFF] hover:text-[#5C8EFF]/80",
            }
          }}
        />
      </div>
    </div>
  );
}
