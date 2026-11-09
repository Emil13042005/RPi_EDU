import { useState, useReducer, useRef, useEffect } from 'react';
import styles from './Lecturers.module.css';
import { lecturers } from '../data/lecturers'; // Путь к твоим данным

// --- Логика фильтрации (Вариант 3) ---
const initialFilterState = { sortBy: 'default' };

function filterReducer(state, action) {
  switch (action.type) {
    case 'SORT_BY_PRICE': return { ...state, sortBy: 'price_asc' };
    case 'SORT_BY_EXPERIENCE': return { ...state, sortBy: 'experience_desc' };
    case 'RESET': return initialFilterState;
    default: return state;
  }
}

export default function Lecturers({ onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
  
  // --- Логика фокуса (Вариант 12) ---
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Автофокус при открытии страницы
    const timer = setTimeout(() => {
      if (searchInputRef.current) searchInputRef.current.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) searchInputRef.current.focus(); // Возврат фокуса
  };

  // Вспомогательная функция для получения минимальной цены
  const getMinPrice = (tariffs) => {
    if (!tariffs || tariffs.length === 0) return 0;
    const match = tariffs[0].match(/\d+/g);
    return match ? parseInt(match[0]) : 0;
  };

  // Фильтрация по поиску
  let processedLecturers = lecturers.filter((lecturer) => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = lecturer.name.toLowerCase().includes(searchLower);
    const subjectMatch = lecturer.subjects?.some(sub => sub.title.toLowerCase().includes(searchLower));
    return nameMatch || subjectMatch;
  });

  // Сортировка
  if (filterState.sortBy === 'price_asc') {
    processedLecturers.sort((a, b) => getMinPrice(a.tariffs) - getMinPrice(b.tariffs));
  } else if (filterState.sortBy === 'experience_desc') {
    processedLecturers.sort((a, b) => b.experience - a.experience);
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Наши лекторы</h1>

      {/* Панель поиска и фильтров */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Поиск по имени или дисциплине..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchInputRef}
            className={styles.searchInput}
          />
          <button onClick={handleClearSearch} className={styles.clearBtn}>
            Очистить
          </button>
        </div>

        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${filterState.sortBy === 'price_asc' ? styles.activeFilter : ''}`}
            onClick={() => dispatch({ type: 'SORT_BY_PRICE' })}
          >
            По цене
          </button>
          <button 
            className={`${styles.filterBtn} ${filterState.sortBy === 'experience_desc' ? styles.activeFilter : ''}`}
            onClick={() => dispatch({ type: 'SORT_BY_EXPERIENCE' })}
          >
            По стажу
          </button>
          <button 
            className={styles.resetBtn}
            onClick={() => dispatch({ type: 'RESET' })}
          >
            Сбросить
          </button>
        </div>
      </div>

      {/* Сетка карточек */}
      <div className={styles.grid}>
        {processedLecturers.length > 0 ? (
          processedLecturers.map((lecturer) => (
            <div key={lecturer.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={lecturer.photo} 
                  alt={lecturer.name} 
                  className={styles.photo}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x250?text=' + lecturer.name; }}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.name}>{lecturer.name}</h2>
                <p className={styles.infoRow}><strong>Стаж:</strong> {lecturer.experience} лет</p>
                <p className={styles.infoRow}><strong>Цена:</strong> от {getMinPrice(lecturer.tariffs)} ₽</p>
                
                {/* Кнопка "Подробнее" (передаёт лектора наверх) */}
                <button 
                  className={styles.detailsBtn}
                  onClick={() => onViewDetails(lecturer)}
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.notFound}>Ничего не найдено 😔</p>
        )}
      </div>
    </div>
  );
}