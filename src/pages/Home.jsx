import styles from '../styles/Home.module.css';
import heroImg from '../assets/hero.jpg'; 

// Импортируем компоненты, чтобы вывести их на главной
import About from './About';
import Contacts from './Contacts';

// Добавляем пропс onNavigateToLecturers для кнопки
function Home({ onNavigateToLecturers }) {
  return (
    <div className={styles.pageContainer}>
      
      {/* 1. Главный баннер */}
      <div className={styles.hero}>
        <img
          src={heroImg}
          alt="Наши лекторы"
          className={styles.heroImage}
        />
        <p className={styles.heroText}>
          Наши лекторы — признанные специалисты в своих областях, готовые
          делиться опытом и знаниями.
        </p>
      </div>

      {/* 2. Кнопка "Найти лектора" */}
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <button 
          onClick={onNavigateToLecturers}
          style={{
            padding: '16px 40px',
            fontSize: '1.2rem',
            fontWeight: '600',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Найти лектора
        </button>
      </div>

      {/* 3. Блок "О нас" (из файла About.jsx) */}
      <About />

      {/* 4. Блок "Партнёры" (из файла Contacts.jsx) */}
      <Contacts />

    </div>
  );
}

export default Home;