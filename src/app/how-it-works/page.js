"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import styles from './HowItWorks.module.css';

const EXERCISES = [
  { id: 1, title: 'Barbell Chest Press', video: 'Barbell Chest Press.mp4', thumbnail: 'Barbell Chest Press' },
  { id: 2, title: 'Bent Over rows', video: 'Bent Over rows.mp4', thumbnail: 'Bent Over rows' },
  { id: 3, title: 'Bicep Curls', video: 'Bicep Curls.mp4', thumbnail: 'Bicep Curls' },
  { id: 4, title: 'Front Raises', video: 'Front Raises.mp4', thumbnail: 'Front Raises' },
  { id: 5, title: 'Glute Kickback', video: 'Glute Kickback 1.mp4', thumbnail: 'Glute Kickback 1' },
  { id: 6, title: 'Hamstring Curls', video: 'Hamstring Curls.mp4', thumbnail: 'Hamstring Curls' },
  { id: 7, title: 'Romanian Deadlift', video: 'Romanian Deadlift.mp4', thumbnail: 'Romanian Deadlift' },
  { id: 8, title: 'Shoulder Press', video: 'Shoulder Press.mp4', thumbnail: 'Shoulder Press' },
  { id: 9, title: 'Suitcase Squat', video: 'Suitcase Squat.mp4', thumbnail: 'Suitcase Squat' },
  { id: 10, title: 'Tricep Extension', video: 'Tricep Extension 1.mp4', thumbnail: 'Tricep Extension 1' },
];

export default function HowItWorksPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = (videoFile) => {
    setActiveVideo(`/videos/exercises/${videoFile}`);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <main className={styles.main}>
      {/* 
        We use a dark theme navbar to match the rest of the site, 
        but the page itself is white as per design.
      */}
      <Navbar />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.pill}>Exercises</div>
          <p className={styles.subtitle}>+200 Exercise coming soon</p>
        </div>
        
        <div className={styles.grid}>
          {EXERCISES.map(exercise => (
            <div 
              key={exercise.id} 
              className={styles.card}
              onClick={() => openVideo(exercise.video)}
            >
              {/* Since we don't have thumbnails provided, we'll use a video element 
                  paused at the first frame to act as a thumbnail. */}
              <video 
                src={`/videos/exercises/${exercise.video}#t=0.1`} 
                className={styles.thumbnail}
                preload="metadata"
                muted
                playsInline
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
              />
              
              <div className={styles.playOverlay}>
                <div className={styles.playIcon}>▶</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div className={styles.videoModal} onClick={closeVideo}>
          <button className={styles.closeBtn} onClick={closeVideo}>✕</button>
          <div className={styles.videoContainer} onClick={(e) => e.stopPropagation()}>
            <video 
              src={activeVideo} 
              controls 
              autoPlay 
              playsInline
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              className={styles.activeVideo}
            />
          </div>
        </div>
      )}
    </main>
  );
}
