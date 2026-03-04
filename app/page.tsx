"use client";

import Link from "next/link";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleSignup = async () => {
  try {
    const res = await fetch("http://localhost:5000/health");

    if (!res.ok) {
      router.push("/backend-error");
      return;
    }

    console.log("Backend connected - continue signup");
  } catch (error) {
    router.push("/backend-error");
  }
};
  return (
    <div className="h-screen bg-white flex items-stretch justify-center px-6">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-stretch justify-between gap-10">
        {/* LEFT SIDE IMAGE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-10 lg:py-0">
          <img
            src="/illustration.png"
            alt="Illustration"
            className="w-[85%] sm:w-[80%] lg:w-[88%] max-w-[520px] object-contain"
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
            shadow-[0_55px_120px_rgba(0,0,0,0.6)]
            px-10
          "
          >
            {/* Inner panel effect: blended center + only side depth (no top/bottom border) */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[78%] -translate-x-1/2 bg-gradient-to-b from-white/10 via-black/10 to-black/35" />
            <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_20px_0_45px_rgba(0,0,0,0.55),inset_-20px_0_45px_rgba(0,0,0,0.55)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" />

            <div className="relative z-10 h-full px-10 pt-14 pb-10 text-white">
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
                  <FaUser className="mr-4 text-sm opacity-80" />
                  <input
                    type="text"
                    placeholder="Name"
                    className="bg-transparent outline-none w-full placeholder-white text-sm"
                  />
                </div>

                <div className="flex items-center border-b border-white/60 pb-2">
                  <FaEnvelope className="mr-4 text-sm opacity-80" />
                  <input
                    type="email"
                    placeholder="Email"
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

              {/* SIGNUP BUTTON (text changed to "SignUp") */}
              <button
                onClick={handleSignup}
               className="
                  mt-10
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
               SignUp
              </button>

              {/* LOGIN LINK */}
              <p className="text-center text-xs mt-4 opacity-90">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-yellow-400 cursor-pointer hover:text-yellow-300"
                >
                  Login
                </Link>
              </p>

              {/* DIVIDER */}
              <div className="my-8 border-t border-white/40"></div>

              {/* GOOGLE BUTTON */}
              <a
                href="https://accounts.google.com/ServiceLogin?service=mail"
                target="_blank"
                rel="noreferrer"
                className="
                w-full
                h-[45px]
                border border-white/50
                rounded-md
                flex items-center justify-center
                text-sm
                hover:bg-white
                hover:text-[#0c2b5a]
                transition
              "
              >
                <FcGoogle className="mr-3 text-lg" />
                Sign up with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}