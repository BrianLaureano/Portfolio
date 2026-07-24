import Image from 'next/image';
import styles from './Photo.module.css';

/**
 * Foto com placeholder embutido.
 *
 * Com `src`, usa o next/image (lazy + responsivo, recorte por object-fit).
 * Sem `src`, cai num bloco de cor quente derivado do nome do item —
 * determinístico, então o layout não "pisca" e cada card tem cor estável.
 *
 * `focus` ajusta o object-position (ex: 'top', '50% 30%') quando o recorte
 * automático corta a parte errada da foto.
 */

// Paleta de placeholder: quente por padrão (creme, torra, terracota, caramelo),
// com sálvia e azul-manhã entrando de vez em quando pra grade não ficar monótona.
const TONES = [
  ['#e7d9c2', '#bc9a6d'],
  ['#8a5c39', '#3d2519'],
  ['#f0e8db', '#c9b699'],
  ['#d9ad8a', '#9c6b43'],
  ['#5c3f2a', '#2b1c12'],
  ['#e3d3bb', '#a8845a'],
  ['#c3cbba', '#7f9078'],
  ['#cdd6dc', '#8fa3b0'],
];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) % 100000;
  }
  return h;
}

export default function Photo({
  src,
  alt = '',
  name = '',
  ratio,
  tone,
  focus,
  priority = false,
  sizes = '(max-width: 700px) 90vw, 40vw',
  className = '',
}) {
  const seed = hash(name || alt || 'aurora');
  const [from, to] = TONES[(tone ?? seed) % TONES.length];
  const angle = 120 + (seed % 7) * 18;

  return (
    <div
      className={`${styles.photo} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.img}
          style={focus ? { objectPosition: focus } : undefined}
        />
      ) : (
        <div
          className={styles.fill}
          role="img"
          aria-label={alt || name}
          style={{ backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})` }}
        >
          <span className={styles.mark} aria-hidden="true">
            {(name || 'Aurora').slice(0, 1)}
          </span>
        </div>
      )}
      <span className={styles.grain} aria-hidden="true" />
    </div>
  );
}
