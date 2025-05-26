'use client';

import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.esquerda}>
        <div className={styles.title}>
          <Link href="/" className={styles.link}>Reticketify</Link>
        </div>
      </div>

      <div className={styles.direita}>
        <div className={styles.busca}>
          <input type="text" placeholder="Pesquisar eventos..." />
        </div>
        <div>
          <Link href="/cadastrar" className={`${styles.button} ${styles.cadastrar}`}>
            <span className={styles.texto}>Cadastrar Evento</span>
            <span className={styles.plus}>+</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
