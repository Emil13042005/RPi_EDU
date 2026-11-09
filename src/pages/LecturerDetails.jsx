import styles from './LecturerDetails.module.css';

export default function LecturerDetails({ lecturer, onBack }) {
  // Если лектор не передан, ничего не рендерим
  if (!lecturer) return null;

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>
        ← Назад к списку
      </button>

      <div className={styles.header}>
        <img 
          src={lecturer.photo} 
          alt={lecturer.name} 
          className={styles.photo}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=' + lecturer.name; }}
        />
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{lecturer.name}</h1>
          <p className={styles.info}><strong>Образование:</strong> {lecturer.education}</p>
          <p className={styles.info}><strong>Стаж:</strong> {lecturer.experience} лет</p>
          <p className={styles.info}><strong>Учёная степень:</strong> {lecturer.degree}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Преподаваемые дисциплины</h2>
        {lecturer.subjects.map((subject, index) => (
          <div key={index} className={styles.subjectCard}>
            <h3 className={styles.subjectTitle}>{subject.title}</h3>
            <ol className={styles.topicsList}>
              {subject.topics.map((topic, i) => (
                <li key={i} className={styles.topicItem}>{topic}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Тарифы</h2>
        <ul className={styles.tariffsList}>
          {lecturer.tariffs.map((tariff, index) => (
            <li key={index} className={styles.tariffItem}>{tariff}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}