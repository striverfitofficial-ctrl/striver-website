"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import styles from "../signup/Signup.module.css";

export default function Login() {
  const router = useRouter();
  const { signIn, signInWithOAuth, signInWithPhone, verifyPhoneOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { error: authError } = await signIn({ email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setSuccess("Logged in! Redirecting...");
    setTimeout(() => router.push("/"), 800);
  };

  const handleOAuth = async (provider) => {
    setError("");
    const { error: oauthError } = await signInWithOAuth(provider);
    if (oauthError) setError(oauthError.message);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const fullPhoneNumber = `${countryCode}${phone.replace(/\D/g, '')}`;

    const { error: otpError } = await signInWithPhone(fullPhoneNumber);
    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setOtpSent(true);
    setSuccess("Verification code sent to your phone!");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const fullPhoneNumber = `${countryCode}${phone.replace(/\D/g, '')}`;

    const { error: verifyError } = await verifyPhoneOtp(fullPhoneNumber, otp);
    setLoading(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    setSuccess("Logged in! Redirecting...");
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Striverfit"
              width={140}
              height={32}
              className={styles.logoImg}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>
        </div>

        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Enter your credentials to access your account.</p>

        {error && <p className={styles.errorMsg}>{error}</p>}
        {success && <p className={styles.successMsg}>{success}</p>}

        <div className={styles.socialButtons}>
          <button
            className={styles.socialBtn}
            onClick={() => handleOAuth("google")}
            type="button"
          >
            <FcGoogle size={20} />
            Google
          </button>
          <button
            className={styles.socialBtn}
            onClick={() => {
              setIsPhoneMode(true);
              setError("");
              setSuccess("");
            }}
            type="button"
          >
            <FaPhoneAlt size={16} color="#fff" />
            Phone
          </button>
        </div>

        <div className={styles.divider}>
          <span>Or</span>
        </div>

        {isPhoneMode ? (
          <form className={styles.form} onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
            {!otpSent ? (
              <>
                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <div className={styles.phoneInputWrapper}>
                    <select 
                      className={styles.countrySelect}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+1">US (+1)</option>
                      <option value="+44">UK (+44)</option>
                      <option value="+91">IN (+91)</option>
                      <option value="+61">AU (+61)</option>
                      <option value="+81">JP (+81)</option>
                      <option value="+49">DE (+49)</option>
                      <option value="+33">FR (+33)</option>
                    </select>
                    <input
                      className={styles.phoneInput}
                      type="tel"
                      placeholder="1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <label>Verification Code</label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "Verifying..." : "Verify & Log In"}
                </button>
              </>
            )}
            <button 
              type="button" 
              className={styles.link} 
              style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => {
                setIsPhoneMode(false);
                setOtpSent(false);
                setError("");
                setSuccess("");
              }}
            >
              Back to Email Login
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}

        <p className={styles.footerText}>
          Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
