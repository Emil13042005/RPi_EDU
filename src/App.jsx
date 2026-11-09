import { useState } from 'react';
import Home from './pages/Home';
import Lecturers from './pages/Lecturers';
import LecturerDetails from './pages/LecturerDetails'; 
import About from './pages/About';       // Импортируем страницу "О нас"
import Contacts from './pages/Contacts'; // Импортируем страницу "Партнёры" (у тебя она называется Contacts)

export default function App() {
  // Состояние для текущей страницы
  const [currentPage, setCurrentPage] = useState('home');
  
  // Состояние для выбранного лектора
  const [selectedLecturer, setSelectedLecturer] = useState(null);

  // Функции для переключения страниц
  const goToHome = () => {
    setCurrentPage('home');
    setSelectedLecturer(null);
  };

  const goToLecturers = () => {
    setCurrentPage('lecturers');
    setSelectedLecturer(null);
  };

  const goToAbout = () => {
    setCurrentPage('about');
    setSelectedLecturer(null);
  };

  const goToContacts = () => {
    setCurrentPage('contacts');
    setSelectedLecturer(null);
  };

  const goToDetails = (lecturer) => {
    setSelectedLecturer(lecturer);
    setCurrentPage('details');
  };

  // Общие стили для кнопок навигации
  const navBtnStyle = (page) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: currentPage === page ? '#4f46e5' : '#6b7280',
    fontWeight: currentPage === page ? '600' : '400',
    padding: '5px 10px',
    transition: 'color 0.2s'
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      
      {/* --- НАВИГАЦИЯ (NAVBAR) --- */}
      <nav style={{ 
        padding: '15px 30px', 
        backgroundColor: '#ffffff', 
        borderBottom: '1px solid #e5e7eb', 
        display: 'flex', 
        gap: '30px', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <button onClick={goToHome} style={navBtnStyle('home')}>Главная</button>
        <button onClick={goToLecturers} style={navBtnStyle('lecturers')}>Лекторы</button>
        <button onClick={goToAbout} style={navBtnStyle('about')}>О нас</button>
        <button onClick={goToContacts} style={navBtnStyle('contacts')}>Партнёры</button>
      </nav>

      {/* --- РЕНДЕР СТРАНИЦ (РОУТИНГ) --- */}
      <main>
        {currentPage === 'home' && (
          <Home onNavigateToLecturers={goToLecturers} />
        )}
        
        {currentPage === 'lecturers' && (
          <Lecturers onViewDetails={goToDetails} />
        )}

        {currentPage === 'about' && (
          <About />
        )}

        {currentPage === 'contacts' && (
          <Contacts />
        )}
        
        {currentPage === 'details' && selectedLecturer && (
          <LecturerDetails 
            lecturer={selectedLecturer} 
            onBack={goToLecturers} 
          />
        )}
      </main>
    </div>
  );
}