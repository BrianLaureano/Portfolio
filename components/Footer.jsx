import styles from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Cardápio',
    links: ['Quentes', 'Gelados', 'Padaria'],
  },
  {
    title: 'A casa',
    links: ['Onde estamos', 'Horários', 'Nossa história'],
  },
  {
    title: 'Contato',
    links: ['Fale com a gente', 'Trabalhe conosco', 'Vale-presente'],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contato">
      <div className={styles.panel}>
        <p className={`hand ${styles.word}`}>Café Aurora</p>

        <div className={styles.cols}>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul className={styles.list}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#topo" className={styles.link}>
                      <span className={styles.chev} aria-hidden="true">
                        ›
                      </span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.base}>
          <span>Rua das Oliveiras, 128 — Vila Madalena, São Paulo</span>
          <span>© {new Date().getFullYear()} Café Aurora</span>
        </div>
      </div>
    </footer>
  );
}
