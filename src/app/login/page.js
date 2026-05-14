"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import styles from "../signup/Signup.module.css"; // Reuse signup styles since the UI is basically the same

export default function Login() {
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

        <div className={styles.socialButtons}>
          <button className={styles.socialBtn} onClick={() => alert("Google authentication flow will be integrated here.")}>
            <FcGoogle size={20} />
            Google
          </button>
          <button className={styles.socialBtn} onClick={() => alert("Apple authentication flow will be integrated here.")}>
            <FaApple size={20} color="#fff" />
            Apple
          </button>
        </div>

        <div className={styles.divider}>
          <span>Or</span>
        </div>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); alert("Login form submitted. Backend integration pending."); }}>
          <div className={styles.inputGroup}>
            <label>Email/ Mobile No</label>
            <input type="text" placeholder="" />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="" />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log In
          </button>
        </form>

        <p className={styles.footerText}>
          Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
