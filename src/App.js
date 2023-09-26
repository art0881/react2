import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';
import BlogDetails from './components/BlogDetails';
import Create from './components/Create';
import Page404 from './components/Page404';
import EditBlog from './components/EditBlog';

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Обработчик прокрутки страницы
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 2) {
      // Если пользователь прокрутил более половины экрана, показываем кнопку
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Header />
      {showScrollButton && (
        <button id="scroll-to-top" onClick={scrollToTop}>
        <img className="header-add " title="Наверх" alt="Наверх" src="https://www.svgrepo.com/show/408831/circle-up.svg"/>
        </button>
      )}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path="/blogs/:id/edit" element={<EditBlog/>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
