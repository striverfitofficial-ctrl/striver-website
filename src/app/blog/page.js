import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import SharedFooter from '@/components/SharedFooter/SharedFooter';
import styles from './Blog.module.css';

export default function Blog() {
  const articles = [
    {
      id: 1,
      image: '/images/blog/blog_1_box_jump.png',
      title: 'Why Most Home Workouts Fail After 2 Weeks',
      description: 'Discover the real reason people lose consistency and how structured smart training solves it.',
    },
    {
      id: 2,
      image: '/images/blog/blog_2_treadmill.png',
      title: 'The Science Behind Adaptive Resistance Training',
      description: 'Learn how intelligent resistance systems improve strength progression and workout efficiency.',
    },
    {
      id: 3,
      image: '/images/blog/blog_3_muscle.png',
      title: 'Can Short Workouts Actually Build Muscle?',
      description: 'Why 30–45 minute sessions may be more sustainable and effective than long gym routines.',
    },
    {
      id: 4,
      image: '/images/blog/blog_4_inconsistent.png',
      title: 'The Hidden Cost of Inconsistent Fitness',
      description: 'How skipping workouts affects energy, productivity, posture, sleep, and long-term health.',
    },
    {
      id: 5,
      image: '/images/blog/blog_5_gym_floor.png',
      title: 'Smart Strength Training vs Traditional Gyms',
      description: 'A comparison between crowded gyms and guided home fitness ecosystems.',
    },
    {
      id: 6,
      image: '/images/blog/blog_6_core_workout.png',
      title: 'How Busy Professionals Can Stay Fit From Home',
      description: 'Simple strategies for maintaining consistency despite demanding schedules.',
    },
    {
      id: 7,
      image: '/images/blog/blog_7_outdoor_pushup.png',
      title: 'Why Tracking Progress Improves Motivation',
      description: 'How workout analytics and measurable progress help build long-term habits.',
    },
    {
      id: 8,
      image: '/images/blog/blog_8_home_treadmill.png',
      title: 'The Best Home Gym Setup for Small Apartments',
      description: 'Creating a minimal, efficient fitness space without sacrificing living space.',
    },
    {
      id: 9,
      image: '/images/blog/blog_9_stretching.png',
      title: 'Strength Training for Modern Lifestyles',
      description: 'Why strength training is becoming essential for desk workers and urban professionals.',
    },
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image 
            src="/images/living-room-machine.png" 
            alt="Striverfit Machine in living room" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>BLOG</h1>
          <p className={styles.heroSubtitle}>
            Understanding the Challenges of Maintaining Fitness Consistency and the Impact of Intelligent Training
          </p>
        </div>
      </section>

      <section className={styles.articlesSection}>
        <div className={styles.articlesHeader}>
          <div className={styles.articlesBadge}>ARTICLES</div>
          <Link href="/shop" className={styles.shopBtn}>Shop now</Link>
        </div>

        <div className={styles.grid}>
          {articles.map(article => (
            <article key={article.id} className={styles.card}>
              <div className={styles.cardImageContainer}>
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardDesc}>{article.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SharedFooter />
    </main>
  );
}
