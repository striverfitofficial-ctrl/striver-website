"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Accessories.module.css';
import Navbar from '@/components/Navbar/Navbar';

const ACCESSORIES = [
  { id: 1, image: '/images/accessories/1.png' },
  { id: 2, image: '/images/accessories/2.png' },
  { id: 3, image: '/images/accessories/3.png' },
  { id: 4, image: '/images/accessories/4.png' },
  { id: 5, image: '/images/accessories/5.png' },
  { id: 6, image: '/images/accessories/6.png' },
  { id: 7, image: '/images/accessories/7.png' },
  { id: 8, image: '/images/accessories/8.png' },
  { id: 9, image: '/images/accessories/9.png' },
  { id: 10, image: '/images/accessories/10.png' }
];

export default function AccessoriesPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);

  // Load existing selected accessories on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('selectedAccessories');
      if (stored) {
        setSelectedIds(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    localStorage.setItem('selectedAccessories', JSON.stringify(selectedIds));
    router.push('/shop');
  };

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.content}>
        <h1 className={styles.title}>Accessories</h1>
        
        <div className={styles.grid}>
          {ACCESSORIES.map(acc => (
            <div 
              key={acc.id} 
              className={`${styles.card} ${selectedIds.includes(acc.id) ? styles.selected : ''}`}
              onClick={() => toggleSelection(acc.id)}
            >
              <div className={styles.imageContainer}>
                <Image 
                  src={acc.image} 
                  alt={`Accessory ${acc.id}`} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {selectedIds.includes(acc.id) && (
                <div className={styles.checkIcon}>✓</div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
