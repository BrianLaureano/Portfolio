'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import styles from './Nav.module.css';

const LINKS = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'A casa', href: '#casa' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Onde estamos', href: '#contato' },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Trava o scroll do fundo enquanto o overlay está aberto e devolve no unmount.
  useEffect(() => {
    document.body.dataset.lock = open ? 'true' : 'false';
    return () => {
      document.body.dataset.lock = 'false';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`${styles.bar} ${open ? styles.barOpen : ''}`}>
        <a href="#topo" className={styles.brand}>
          Café Aurora
        </a>

        <div className={styles.right}>
          <a
            href="#cardapio"
            className={`btn ${open ? styles.ctaOnDark : 'btn--dark'} ${styles.cta}`}
            onClick={() => setOpen(false)}
          >
            Peça agora
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.line} ${open ? styles.lineTop : ''}`} />
            <span className={`${styles.line} ${open ? styles.lineBottom : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.overlay}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.62, ease: EASE }}
          >
            <ul className={styles.list}>
              {LINKS.map((link, i) => (
                <li key={link.href} className={styles.item}>
                  <motion.a
                    href={link.href}
                    className={styles.link}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%', transition: { duration: 0.3, ease: 'easeIn' } }}
                    transition={{ duration: 0.7, delay: 0.12 + i * 0.07, ease: EASE }}
                  >
                    {link.label}
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className={styles.meta}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <span className={styles.metaKey}>Horário</span>
                Seg a sex, 7h–19h
                <br />
                Sáb e dom, 8h–17h
              </div>
              <div>
                <span className={styles.metaKey}>Endereço</span>
                Rua das Oliveiras, 128
                <br />
                Vila Madalena, São Paulo
              </div>
              <div>
                <span className={styles.metaKey}>Contato</span>
                oi@cafeaurora.com.br
                <br />
                (11) 4002-8922
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
