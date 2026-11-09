import styles from '../styles/About.module.css';

const PRINCIPLES = [
  'Практика важнее теории',
  'Разбор реальных ошибок',
  'Поддержка на каждом этапе',
];

function About() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.headerH1}>О нашей Академии</h1>
      <p className={styles.textP}>
      Наша учебная платформа  соединяет компании, образовательные учреждения и НКО с профессиональными лекторами, спикерами и тренерами
Мы упрощаем процесс подбора, бронирования и организации лекций, помогая находить экспертов, которые не просто делятся знаниями, но и вдохновляют аудиторию.
      </p>

      <div className={styles.principles}>
        <h3 className={styles.principlesTitle}>Наши принципы:</h3>
        <ul className={styles.principlesList}>
          {PRINCIPLES.map((item) => (
            <li key={item} className={styles.textP}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;