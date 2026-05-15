import Link from 'next/link';
import styles from './EnvironmentPage.module.css';

export default function EnvironmentPage({ title, description, bgImage }) {
  return (
    <main className={styles.container}>
      <div 
        className={styles.background} 
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className={styles.overlay} />
      
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <Link href="/shop" className={styles.shopBtn}>
          Shop now
        </Link>
      </div>
    </main>
  );
}
