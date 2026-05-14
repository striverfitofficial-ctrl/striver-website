"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import styles from "./Signup.module.css";

export default function Signup() {
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

        <h1 className={styles.title}>Sign up Account</h1>
        <p className={styles.subtitle}>Enter your personal data to create your account.</p>

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

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); alert("Signup form submitted. Backend integration pending."); }}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>First Name</label>
              <input type="text" placeholder="" />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name</label>
              <input type="text" placeholder="" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Email/ Mobile No</label>
            <input type="text" placeholder="" />
          </div>

          <div className={styles.inputGroup}>
            <label>Set Password</label>
            <input type="password" placeholder="" />
            <span className={styles.hint}>Must be at least 8 characters</span>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
