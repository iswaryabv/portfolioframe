"use client";

import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  
  const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/health");

    if (!res.ok) {
      router.push("/backend-error");
      return;
    }

    console.log("Backend connected - continue login");
  } catch (error) {
    router.push("/backend-error");
  }
};
  return (
    <div className="h-screen bg-white flex items-stretch justify-center px-6">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-stretch justify-between gap-12">
        {/* LEFT SIDE IMAGE (login illustration) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-10 lg:py-0">
          <img
            src="/login.png"
            alt="Secure login illustration"
            className="w-[85%] sm:w-[70%] lg:w-[90%] max-w-[550px] object-contain"
          />
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="w-full lg:w-1/2 flex items-stretch justify-center">
          {/* Outer blue block */}
          <div
            className="
            relative
            overflow-hidden
            w-full 
            max-w-[520px]
            lg:h-full
            bg-gradient-to-b
            from-[#5f82e8]
            via-[#3f66c9]
            to-[#021a46]
            rounded-[10px]
            px-10
          "
          >
            {/* Inner panel effect: blended center + only side depth (no top/bottom border) */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[78%] -translate-x-1/2 bg-gradient-to-b from-white/10 via-black/10 to-black/35" />
            <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_20px_0_45px_rgba(0,0,0,0.55),inset_-20px_0_45px_rgba(0,0,0,0.55)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" />

            <div className="relative z-10 h-full px-10 pt-20 pb-10 text-white">
              {/* WELCOME */}
              <h1 className="font-welcome-heading text-2xl sm:text-3xl text-center font-semibold mb-7">
                WELCOME
              </h1>

              {/* LOGO */}
              <div className="flex justify-center mb-8">
                <div
                  className="
                  bg-white
                  w-[180px] sm:w-[220px]
                  h-[70px] sm:h-[85px]
                  rounded-[50%]
                  flex items-center justify-center
                  shadow-lg
                  overflow-hidden
                "
                >
                  <img
                    src="/stackly-logo.png"
                    alt="Stackly Logo"
                    className="h-6 sm:h-8 object-contain"
                  />
                </div>
              </div>

              {/* INPUTS */}
              <div className="space-y-6">
                <div className="flex items-center border-b border-white/60 pb-2">
                  <FaEnvelope className="mr-4 text-sm opacity-80" />
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="bg-transparent outline-none w-full placeholder-white text-sm"
                  />
                </div>

                <div className="flex items-center border-b border-white/60 pb-2">
                  <FaLock className="mr-4 text-sm opacity-80" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-transparent outline-none w-full placeholder-white text-sm"
                  />
                </div>
              </div>

              {/* REMEMBER / FORGOT */}
              <div className="flex items-center justify-between mt-4 text-xs opacity-90">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border border-white/60 bg-transparent accent-[#2d8cf0]"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-[11px] text-sky-200 hover:text-sky-100"
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
             <button
   onClick={handleLogin}
  className="
    mt-8
    w-full
    h-[45px]
    bg-gradient-to-r
    from-[#2d8cf0]
    to-[#5a78c7]
    rounded-md
    text-sm
    font-medium
    shadow-md
    hover:opacity-90
    transition
  "
>
  Login
</button>

              {/* SIGNUP LINK */}
              <p className="text-center text-xs mt-4 text-red-300 opacity-90">
                Don&apos;t have an account?{" "}
                <Link
                  href="/"
                  className="text-white cursor-pointer hover:text-yellow-300"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}