import Photo from './Photo';
import Reveal from './Reveal';
import styles from './Events.module.css';

const CARDS = [
  {
    id: 'privativos',
    title: 'Eventos privativos',
    text: 'Feche a casa pro seu aniversário, uma reunião ou só uma boa desculpa pra juntar gente. Café bom e clima leve inclusos.',
  },
  {
    id: 'catering',
    title: 'Coffee break',
    text: 'A gente leva o café e a padaria até você. Monta, serve e garante que ninguém fique de xícara vazia.',
  },
];

export default function Events() {
  return (
    <section className={styles.events} id="eventos">
      <div className="wrap">
        <Reveal className={styles.head}>
          <span className="eyebrow">Além da xícara</span>
          <h2>Faça seu próximo evento aqui</h2>
          <p className="lede">
            De encontros pequenos a coffee break pra empresa inteira — a gente leva o
            cheiro de café junto.
          </p>
        </Reveal>

        <div className={styles.bento}>
          {CARDS.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.08} className={styles.card}>
              <div className={styles.media}>
                <Photo
                  src={`/fotos/${card.id}.jpg`}
                  alt={card.title}
                  ratio="16 / 10"
                  sizes="(max-width: 780px) 92vw, 46vw"
                />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Reveal>
          ))}

          <Reveal delay={0.16} className={`${styles.card} ${styles.wide}`}>
            <div className={styles.wideCopy}>
              <h3>Cardápio sob medida</h3>
              <p>
                Monte com a nossa equipe um cardápio só seu — de bar de espresso a
                tábua de padaria, a gente resolve.
              </p>
              <a href="#contato" className="btn btn--dark">
                Fale com a gente
              </a>
            </div>
            <div className={styles.wideMedia}>
              <Photo
                src="/fotos/cardapio-sob-medida.jpg"
                alt="Barista preparando o café no balcão"
                sizes="(max-width: 780px) 92vw, 46vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
