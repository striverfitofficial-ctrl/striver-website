import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import styles from '../styles/Policy.module.css';

export default function Terms() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.header}>
        <h1 className={styles.title}>TERMS OF SERVICE</h1>
        <p className={styles.subtitle}>
          Welcome to StriverFit Pvt. Ltd.<br />
          By accessing or using our website, smart fitness equipment, mobile applications, workout programs, fitness tracking tools, or related services, you agree to these Terms of Service.
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Company Information</h2>
          <p className={styles.sectionText}>StriverFit Pvt. Ltd.</p>
          <p className={styles.sectionText}>S No-19, Office No A-80, 2nd Floor, KK Market Satara<br />Road, Dhankawadi, Pune 411046, Maharashtra, India</p>
          <br />
          <p className={styles.sectionText}>Contact Email<br />striverfit.official@gmail.com</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Eligibility</h2>
          <p className={styles.sectionText}>StriverFit services are intended for individuals aged 18 years or older.<br />By using our products or services, you confirm that you meet this requirement.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Products & Services</h2>
          <p className={styles.sectionText}>StriverFit provides:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Smart fitness equipment</li>
            <li className={styles.listItem}>Mobile application access</li>
            <li className={styles.listItem}>Guided workout programs</li>
            <li className={styles.listItem}>Fitness tracking tools</li>
            <li className={styles.listItem}>Workout analytics</li>
            <li className={styles.listItem}>Smart-device syncing</li>
            <li className={styles.listItem}>Personalized fitness assessments</li>
          </ul>
          <p className={styles.sectionText}>We reserve the right to update, improve, or discontinue features at any time.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Payments</h2>
          <p className={styles.sectionText}>Payments for products and services are processed securely through our website.</p>
          <p className={styles.sectionText}>StriverFit does not currently offer subscription-based billing.<br />Users are responsible for providing accurate payment information.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Health & Safety Disclaimer</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>StriverFit is designed to support fitness and wellness goals, but does not replace professional medical advice.</li>
            <li className={styles.listItem}>Users should consult a qualified healthcare professional before beginning any exercise program.</li>
            <li className={styles.listItem}>Use of StriverFit equipment and services is at your own risk.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>User Responsibilities</h2>
          <p className={styles.sectionText}>Users agree to:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Use products responsibly</li>
            <li className={styles.listItem}>Provide accurate account information</li>
            <li className={styles.listItem}>Avoid misuse of the platform or equipment</li>
            <li className={styles.listItem}>Maintain account security</li>
            <li className={styles.listItem}>Use services only for lawful purposes</li>
          </ul>
          <p className={styles.sectionText}>Unauthorized copying, resale, or misuse of StriverFit content or technology is prohibited.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Intellectual Property</h2>
          <p className={styles.sectionText}>All StriverFit content, branding, visuals, software, logos, designs, programs, and related materials are the intellectual property of StriverFit Pvt. Ltd.<br />Users may not reproduce or distribute content without written permission.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
          <p className={styles.sectionText}>StriverFit is not liable for:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>injuries caused by improper equipment use</li>
            <li className={styles.listItem}>misuse of workout recommendations</li>
            <li className={styles.listItem}>interruptions in service</li>
            <li className={styles.listItem}>technical issues beyond reasonable control</li>
            <li className={styles.listItem}>indirect or consequential damages</li>
          </ul>
          <p className={styles.sectionText}>Users assume responsibility for their fitness activities and equipment usage.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Third-Party Services</h2>
          <p className={styles.sectionText}>Certain services may integrate with third-party technologies or smart devices. StriverFit is not responsible for third-party platforms, software, or external services.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Governing Law</h2>
          <p className={styles.sectionText}>These Terms are governed by the laws of Maharashtra, India.<br />Any disputes shall fall under the jurisdiction of courts located in Pune, Maharashtra.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to Terms</h2>
          <p className={styles.sectionText}>We may update these Terms of Service periodically.<br />Continued use of StriverFit services after updates constitutes acceptance of revised terms.</p>
        </section>
      </div>

      <div className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Contact Us</h2>
        <p className={styles.contactText}>
          For questions regarding these Terms:<br />
          striverfit.official@gmail.com
        </p>
      </div>

      <SharedFooter />
    </main>
  );
}
