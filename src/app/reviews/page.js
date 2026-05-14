import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import styles from './Reviews.module.css';

export default function Reviews() {
  const reviewsData = [
    {
      id: 1,
      name: "Daniel Gallego",
      role: "Customer",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum mi sit amet commodo congue. Donec vel posuere leo. Duis ultrices diam sapien, sed rhoncus nisi fermentum eu."
    },
    {
      id: 2,
      name: "Daniel Gallego",
      role: "Customer",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum mi sit amet commodo congue. Donec vel posuere leo. Duis ultrices diam sapien, sed rhoncus nisi fermentum eu."
    },
    {
      id: 3,
      name: "Daniel Gallego",
      role: "Customer",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum mi sit amet commodo congue. Donec vel posuere leo. Duis ultrices diam sapien, sed rhoncus nisi fermentum eu."
    }
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.reviewsSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>What people say</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Discover what our satisfied customer have to say about<br />their experience with our product/service
          </p>
        </div>

        <div className={styles.grid}>
          {reviewsData.map(review => (
            <div key={review.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}></div>
                <div className={styles.userInfo}>
                  <div className={styles.nameContainer}>
                    <span className={styles.name}>{review.name}</span>
                    <span className={styles.verifiedIcon}>✓</span>
                  </div>
                  <span className={styles.role}>{review.role}</span>
                </div>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>★</span>
                  ))}
                </div>
              </div>
              <p className={styles.text}>{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      <SharedFooter />
    </main>
  );
}
