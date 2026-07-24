'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Photo from './Photo';
import styles from './Hero.module.css';

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const still = useReducedMotion();

  // Os cards flutuantes andam em velocidades diferentes da foto — dá profundidade
  // sem precisar de biblioteca de parallax.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const upSlow = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -70]);
  const upFast = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -130]);

  return (
    <section className={styles.hero} id="topo">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`wrap ${styles.head}`}>
        <motion.h1
          className={styles.word}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          Café Aurora
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
        >
          Espresso de torra própria e padaria feita na hora, numa casa de esquina que
          abre antes do sol. Da primeira torra à sua xícara da manhã, cada gole tem
          história.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <a href="#cardapio" className="btn btn--dark">
            Peça agora
          </a>
          <a href="#cardapio" className="btn btn--light">
            Ver cardápio
          </a>
        </motion.div>
      </div>

      <motion.div
        ref={ref}
        className={styles.stage}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.34, ease: EASE }}
      >
        <div className={styles.frame}>
          <Photo
            src="/fotos/salao.jpg"
            alt="Salão do Café Aurora visto da calçada"
            priority
            sizes="(max-width: 1120px) 92vw, 1080px"
          />
          <span className={`hand ${styles.sign}`}>Café Aurora</span>
        </div>

        <motion.figure className={`${styles.chip} ${styles.chipLeft}`} style={{ y: upFast }}>
          <Photo
            src="/fotos/hero-americano.jpg"
            alt="Americano gelado"
            ratio="3 / 4"
            sizes="180px"
          />
          <figcaption className="tag">Americano</figcaption>
        </motion.figure>

        <motion.figure className={`${styles.chip} ${styles.chipRight}`} style={{ y: upSlow }}>
          <Photo
            src="/fotos/hero-latte.jpg"
            alt="Latte com arte na espuma"
            ratio="4 / 3"
            sizes="200px"
          />
          <figcaption className="tag">Latte</figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}
