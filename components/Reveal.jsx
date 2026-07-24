'use client';

import { motion, useReducedMotion } from 'motion/react';

/**
 * Entrada por scroll. Sobe um pouco e revela — uma vez só, sem repetir
 * quando o usuário volta pra cima (repetir vira enjoo em página longa).
 */
export default function Reveal({ children, delay = 0, y = 26, as = 'div', className }) {
  const still = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (still) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
