'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CATEGORIES, ITEMS } from '@/lib/menu';
import Photo from './Photo';
import Reveal from './Reveal';
import styles from './Menu.module.css';

const EASE = [0.22, 1, 0.36, 1];

export default function Menu() {
  const [active, setActive] = useState('todos');
  const list = active === 'todos' ? ITEMS : ITEMS.filter((i) => i.cat === active);

  return (
    <section className={styles.menu} id="cardapio">
      <div className="wrap">
        <Reveal className={styles.head}>
          <span className="eyebrow">O que servimos</span>
          <h2>Dá uma olhada no cardápio</h2>
          <p className="lede">
            Do espresso de torra própria ao pão que sai do forno às seis, tudo aqui é
            feito com calma.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className={styles.filters} role="tablist" aria-label="Categorias do cardápio">
            {CATEGORIES.map((cat) => {
              const on = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  className={`${styles.filter} ${on ? styles.filterOn : ''}`}
                  onClick={() => setActive(cat.id)}
                >
                  {/* A pílula escura desliza entre as abas em vez de piscar */}
                  {on && (
                    <motion.span
                      layoutId="filtro-ativo"
                      className={styles.pill}
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className={styles.filterLabel}>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {list.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={styles.card}
              >
                <Photo
                  src={`/fotos/${item.id}.jpg`}
                  alt={item.name}
                  ratio="4 / 5"
                  sizes="(max-width: 520px) 90vw, (max-width: 860px) 45vw, 30vw"
                />
                <div className={styles.cardFoot}>
                  <span className="tag">{item.name}</span>
                  <span className={styles.price}>{item.price}</span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
