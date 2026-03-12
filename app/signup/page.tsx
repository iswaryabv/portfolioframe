"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { register as registerApi } from "@/lib/api";

type SignupFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupFormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

const initialSignupState: SignupFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupFormState>(initialSignupState);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = (values: SignupFormState): SignupFormErrors => {
    const newErrors: SignupFormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim().toLowerCase())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!values.password) {
      newErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else {
      if (!/[A-Z]/.test(values.password)) {
        newErrors.password = "Password must include an uppercase letter.";
      } else if (!/[0-9]/.test(values.password)) {
        newErrors.password = "Password must include a number.";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        newErrors.password = "Password must include a special character (!@#$%^&* etc.).";
      }
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleChange =
    (field: keyof SignupFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
    };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors((prev) => ({ ...prev, form: undefined }));

      await registerApi({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      setForm(initialSignupState);
      setErrors((prev) => ({ ...prev, form: "Signup successful!" }));
    } catch (error) {
      const isNetworkError =
        error instanceof TypeError ||
        (error instanceof Error &&
          (error.message === "Failed to fetch" ||
            error.message.includes("NetworkError") ||
            error.message.includes("load failed")));
      if (isNetworkError) {
        router.push("/backend-error");
        return;
      }
      const message =
        error instanceof Error ? error.message : "Registration failed. Please try again.";
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 py-6">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-10 auth-layout">
        <div className="w-full lg:w-1/2 flex items-center justify-center py-4 sm:py-6 lg:py-0 order-2 lg:order-1">
          <img
            src="/illustration.png"
            alt="Illustration"
            className="auth-image w-[85%] sm:w-[80%] lg:w-[88%] max-w-[520px] object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
        <div
          className="
            relative overflow-hidden w-full max-w-[520px]
            bg-gradient-to-b from-[#5f82e8] via-[#3f66c9] to-[#021a46]
            rounded-[10px] px-6 sm:px-10 flex flex-col signup-card
          "
        >
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[78%] -translate-x-1/2 bg-gradient-to-b from-white/10 via-black/10 to-black/35" />
            <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_20px_0_45px_rgba(0,0,0,0.55),inset_-20px_0_45px_rgba(0,0,0,0.55)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" />

            <div className="relative z-10 flex flex-col px-4 sm:px-6 pt-3 sm:pt-4 pb-3 sm:pb-4 text-white signup-card-content">
              <div className="w-full flex justify-center flex-shrink-0">
                <h1 className="font-welcome-heading text-xl sm:text-2xl text-center font-semibold mb-2 sm:mb-3 tracking-widest">
                  WELCOME
                </h1>
              </div>

              <div className="flex justify-center mb-1.5 sm:mb-2 flex-shrink-0">
                <div className="bg-white w-[120px] sm:w-[140px] lg:w-[200px] h-[44px] sm:h-[52px] lg:h-[80px] rounded-[50%] flex items-center justify-center shadow-lg">
                  <img src="/stackly-logo.png" alt="Stackly Logo" className="h-3.5 sm:h-4 lg:h-8 object-contain" />
                </div>
              </div>

              <form onSubmit={handleSignup} noValidate>
                <div className="space-y-2 sm:space-y-2.5 flex-shrink-0">
                  <div className="flex flex-col">
                    <div className="flex items-center border-b border-white/80 pb-2">
                      <FaUser className="mr-3 text-sm text-white/90" />
                      <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange("name")}
                        className="bg-transparent outline-none w-full placeholder-white/90 text-sm text-white"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </div>
                    {errors.name && (
                      <p id="name-error" className="auth-error-text mt-0.5 text-[11px] sm:text-xs">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-b border-white/80 pb-2">
                      <FaEnvelope className="mr-3 text-sm text-white/90" />
                      <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange("email")}
                        className="bg-transparent outline-none w-full placeholder-white/90 text-sm text-white"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="auth-error-text mt-0.5 text-[11px] sm:text-xs">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-b border-white/80 pb-2 relative">
                      <FaLock className="mr-3 text-sm text-white/90" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange("password")}
                        className="bg-transparent outline-none w-full placeholder-white/90 text-sm text-white pr-10"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                      />
                      {/[a-zA-Z0-9]/.test(form.password) && (
                        <button
                          type="button"
                          aria-label="Toggle password visibility"
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 leading-tight">
                      Password must: at least 6 characters • a number • an uppercase letter • a special character (!@#$%^&*).
                    </p>
                    {errors.password && (
                      <p id="password-error" className="auth-error-text mt-0.5 text-[11px] sm:text-xs">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-b border-white/80 pb-2 relative">
                      <FaLock className="mr-3 text-sm text-white/90" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        className="bg-transparent outline-none w-full placeholder-white/90 text-sm text-white pr-10"
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                      />
                      {/[a-zA-Z0-9]/.test(form.confirmPassword) && (
                        <button
                          type="button"
                          aria-label="Toggle confirm password visibility"
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                        >
                          {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                        </button>
                      )}
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirmPassword-error" className="auth-error-text mt-0.5 text-[11px] sm:text-xs">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {errors.form && (
                  <p
                    className={`mt-2 text-[11px] sm:text-xs font-medium ${errors.form === "Signup successful!" ? "text-green-300" : "auth-error-text"}`}
                  >
                    {errors.form}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 w-full h-[42px] flex-shrink-0 bg-gradient-to-r from-[#2d8cf0] to-[#5a78c7] rounded-md text-sm font-medium text-white shadow-md hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Checking..." : "Sign Up"}
                </button>
              </form>

              <p className="text-center text-xs mt-2 text-white/80 flex-shrink-0">
                Already have an account?{" "}
                <Link href="/login" className="text-amber-300 hover:text-amber-200 font-medium">
                  Login
                </Link>
              </p>

              <div className="my-2 border-t border-white/50 flex-shrink-0" />

              <div className="flex-shrink-0 pt-1 pb-4 sm:pb-6">
                <a
                  href={
                    "https://accounts.google.com/o/oauth2/v2/auth" +
                    "?client_id=703831654489-m34p97it8cppn924006cgt8u6jgk9tsa.apps.googleusercontent.com" +
                    "&redirect_uri=http://localhost:5000/api/auth/google" +
                    "&response_type=code" +
                    "&scope=openid%20email%20profile" +
                    "&access_type=online" +
                    "&prompt=select_account"
                  }
                  className="w-full h-[42px] border border-white/80 rounded-md flex items-center justify-center text-sm font-medium bg-transparent text-white hover:bg-white hover:text-[#0c2b5a] transition"
                >
                  <FcGoogle className="mr-3 text-lg" />
                  Sign up with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
