import styles from '../../styles/Navbar.module.css';

const NAV_ITEMS = [
  { key: 'home', label: 'Главная' },
  { key: 'contacts', label: 'Партнёры' },
  { key: 'about', label: 'О нас' },
  { key: 'lecturers', label: 'Лекторы' },
  
];

function Navbar({ currentSection, onNavigate }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navButtons}>
        {NAV_ITEMS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`${styles.btn} ${
              currentSection === key ? styles.btnActive : ''
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;