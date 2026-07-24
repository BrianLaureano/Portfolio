'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Photo from './Photo';
import styles from './Mood.module.css';

const SHOTS = [
  { key: 'balcao', src: '/fotos/balcao.jpg', alt: 'Balcão do café com o barista' },
  { key: 'cliente', src: '/fotos/cliente.jpg', alt: 'Cliente segurando a xícara' },
  { key: 'espresso-manha', src: '/fotos/espresso-manha.jpg', alt: 'Espresso da manhã' },
  { key: 'pao-na-grade', src: '/fotos/pao-na-grade.jpg', alt: 'Pães saindo do forno' },
  { key: 'mesa-da-janela', src: '/fotos/mesa-da-janela.jpg', alt: 'Mesa da janela com amigos' },
  { key: 'copo-na-rua', src: '/fotos/copo-na-rua.jpg', alt: 'Copo gelado na calçada' },
  { key: 'barista', src: '/fotos/barista.jpg', alt: 'Barista finalizando a arte na espuma' },
  { key: 'mood-croissant', src: '/fotos/mood-croissant.jpg', alt: 'Croissant na luz da manhã' },
];

// Distância (px) que o cursor precisa percorrer antes de soltar a próxima foto.
const STEP = 92;
// Tempo (ms) que cada foto fica na tela antes de sumir.
const LIFE = 620;

export default function Mood() {
  const stage = useRef(null);
  const slots = useRef([]);
  const cursor = useRef({ x: 0, y: 0 });
  const last = useRef({ x: 0, y: 0 });
  const index = useRef(0);
  const timers = useRef([]);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setFine(mq.matches && !still.matches);
    sync();
    mq.addEventListener('change', sync);
    still.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
    };
  }, []);

  // Limpa os timeouts pendentes no unmount pra não tocar em nó desmontado.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const emit = useCallback(() => {
    const el = slots.current[index.current % SHOTS.length];
    index.current += 1;
    if (!el) return;

    const { x, y } = cursor.current;
    const tilt = (Math.random() * 2 - 1) * 9;

    el.style.transition = 'none';
    el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(0.72) rotate(${tilt}deg)`;
    el.style.opacity = '0';

    // Força o reflow pra que o estado inicial acima seja de fato pintado
    // antes da transição de entrada começar.
    void el.offsetWidth;

    el.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1), opacity .35s ease';
    el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1) rotate(${tilt}deg)`;
    el.style.opacity = '1';

    const t = setTimeout(() => {
      el.style.transition = 'transform .8s cubic-bezier(.22,1,.36,1), opacity .5s ease';
      el.style.opacity = '0';
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y + 26}px) scale(0.92) rotate(${tilt}deg)`;
    }, LIFE);
    timers.current.push(t);
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!fine || !stage.current) return;
      const box = stage.current.getBoundingClientRect();
      cursor.current = { x: e.clientX - box.left, y: e.clientY - box.top };

      const dx = cursor.current.x - last.current.x;
      const dy = cursor.current.y - last.current.y;
      if (Math.hypot(dx, dy) < STEP) return;

      last.current = { ...cursor.current };
      emit();
    },
    [fine, emit],
  );

  return (
    <section className={styles.mood} id="casa" ref={stage} onMouseMove={onMove}>
      {fine && (
        <div className={styles.trail} aria-hidden="true">
          {SHOTS.map((shot, i) => (
            <div
              key={shot.key}
              className={styles.slot}
              ref={(el) => {
                slots.current[i] = el;
              }}
            >
              <Photo src={shot.src} alt={shot.alt} ratio="3 / 4" sizes="230px" />
            </div>
          ))}
        </div>
      )}

      <div className={`wrap ${styles.copy}`}>
        <p className={`hand ${styles.hint}`}>
          {fine ? 'Mexa o cursor!' : 'Bem-vindo à casa'}
        </p>
        <h2 className={styles.ask}>Do que você tá com vontade hoje?</h2>
        <div className={styles.actions}>
          <a href="#cardapio" className="btn btn--dark">
            Ver o cardápio
          </a>
          <a href="#contato" className="btn btn--light">
            Onde estamos
          </a>
        </div>
      </div>

      {!fine && (
        <div className={styles.fallback}>
          {SHOTS.slice(0, 4).map((shot) => (
            <div key={shot.key} className={styles.fallbackItem}>
              <Photo src={shot.src} alt={shot.alt} ratio="3 / 4" sizes="(max-width: 560px) 45vw, 22vw" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
