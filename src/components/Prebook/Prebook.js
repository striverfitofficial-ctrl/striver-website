"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./Prebook.module.css";

const images = [
  "/images/page7/coming-soon-1.png",
  "/images/page7/coming-soon-2.png",
  "/images/page7/folded-machine.png",
];

export default function Prebook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [fbName, setFbName] = useState("");
  const [fbEmail, setFbEmail] = useState("");
  const [fbMessage, setFbMessage] = useState("");
  const [fbLoading, setFbLoading] = useState(false);
  const [fbMsg, setFbMsg] = useState("");
  const [fbIsError, setFbIsError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, []);

  // Auto-fill from logged-in web_account
  useEffect(() => {
    if (showModal) {
      try {
        const stored = localStorage.getItem("striver_web_user");
        if (stored) {
          const user = JSON.parse(stored);
          if (user.first_name) setFbName(`${user.first_name} ${user.last_name || ""}`.trim());
          if (user.email) setFbEmail(user.email);
        }
      } catch (e) {}
    }
  }, [showModal]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFbMsg("");
    setFbIsError(false);

    if (!fbMessage.trim()) {
      setFbMsg("Please enter your feedback.");
      setFbIsError(true);
      return;
    }

    setFbLoading(true);

    let webAccountId = null;
    try {
      const stored = localStorage.getItem("striver_web_user");
      if (stored) {
        const user = JSON.parse(stored);
        webAccountId = user.id || null;
      }
    } catch (e) {}

    const { error: insertError } = await supabase
      .from("web_feedback")
      .insert({
        web_account_id: webAccountId,
        name: fbName.trim() || null,
        email: fbEmail.trim() || null,
        message: fbMessage.trim(),
      });

    setFbLoading(false);

    if (insertError) {
      setFbMsg("Something went wrong. Please try again.");
      setFbIsError(true);
      return;
    }

    setFbMsg("Thank you for your feedback! 🎉");
    setFbIsError(false);
    setFbMessage("");
  };

  return (
    <section id="pricing" className={styles.section}>
      <div className={`${styles.textContainer} reveal-up`}>
        <h2 className={styles.title}>Pre-orders Open Until Mid of 2026</h2>
        <p className={styles.subtitle}>
          Be the first to own the intelligent Studio strength system that finally makes{' '}<br />
          consistency effortless. Use the contact form below to get notified.
        </p>
      </div>

      <div className={`${styles.sliderContainer} reveal-scale`}>
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Striver Machine View ${index + 1}`}
            fill
            className={`${styles.machineImage} ${
              index === currentIndex ? styles.active : styles.inactive
            }`}
            sizes="100vw"
            quality={100}
            unoptimized={true}
            priority={index === 0}
          />
        ))}

        <div className={styles.buttonOverlay}>
          <Link href="/wishlist" className={styles.joinBtn}>Join Us</Link>
          <button className={styles.feedbackBtn} onClick={() => { setShowModal(true); setFbMsg(""); }}>
            Give us some feedback and suggestions &gt;
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>✕</button>
            <h3 className={styles.modalTitle}>Share Your Feedback</h3>
            <p className={styles.modalSubtitle}>We value your thoughts — help us build a better Striverfit.</p>

            {fbMsg && (
              <p style={{
                fontSize: '13px',
                marginBottom: '12px',
                textAlign: 'center',
                color: fbIsError ? '#dc2626' : '#00e676',
                background: fbIsError ? 'rgba(220,38,38,0.1)' : 'rgba(0,230,118,0.1)',
                padding: '10px',
                borderRadius: '8px',
              }}>
                {fbMsg}
              </p>
            )}

            <form className={styles.modalForm} onSubmit={handleFeedbackSubmit}>
              <input
                type="text"
                placeholder="Your name (optional)"
                className={styles.modalInput}
                value={fbName}
                onChange={(e) => setFbName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your email (optional)"
                className={styles.modalInput}
                value={fbEmail}
                onChange={(e) => setFbEmail(e.target.value)}
              />
              <textarea
                placeholder="Your feedback or suggestions..."
                className={styles.modalTextarea}
                value={fbMessage}
                onChange={(e) => setFbMessage(e.target.value)}
                required
                rows={4}
              />
              <button type="submit" className={styles.modalSubmitBtn} disabled={fbLoading}>
                {fbLoading ? 'Sending...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
