"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import styles from "../signup/Signup.module.css";

export default function Login() {
  const router = useRouter();
  const { signIn, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn({ email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/");
  };

  const handleOAuth = async (provider) => {
    setError("");
    const { error: oauthError } = await signInWithOAuth(provider);
    if (oauthError) setError(oauthError.message);
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
            onClick={() => handleOAuth("apple")}
            type="button"
          >
            <FaApple size={20} color="#fff" />
            Apple
          </button>
        </div>

        <div className={styles.divider}>
          <span>Or</span>
        </div>

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

        <p className={styles.footerText}>
          Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
