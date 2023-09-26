import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blog }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const blogsPerPage = 5; // Количество блогов на странице
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('newest'); // Начальная сортировка: новые записи

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    const currentDate = currentTime;
    const publishedDate = new Date(date);

    const timeDiff = Math.floor((currentDate - publishedDate) / (1000 * 60)); // Разница в минутах

    if (timeDiff < 1) {
      return 'менее минуты назад';
    } else if (timeDiff < 60) {
      return `${timeDiff} ${pluralize(timeDiff, 'минуту', 'минуты', 'минут')} назад`;
    } else if (timeDiff < 60 * 24) {
      const hoursAgo = Math.floor(timeDiff / 60);
      return `${hoursAgo} ${pluralize(hoursAgo, 'час', 'часа', 'часов')} назад`;
    } else if (timeDiff < 60 * 24 * 7) {
      const daysAgo = Math.floor(timeDiff / (60 * 24));
      return `${daysAgo} ${pluralize(daysAgo, 'день', 'дня', 'дней')} назад`;
    } else if (timeDiff < 60 * 24 * 30) {
      const weeksAgo = Math.floor(timeDiff / (60 * 24 * 7));
      return `${weeksAgo} ${pluralize(weeksAgo, 'неделю', 'недели', 'недель')} назад`;
    } else if (timeDiff < 60 * 24 * 30 * 12) {
      const monthsAgo = Math.floor(timeDiff / (60 * 24 * 30));
      return `${monthsAgo} ${pluralize(monthsAgo, 'месяц', 'месяца', 'месяцев')} назад`;
    } else {
      return 'давно опубликовано';
    }
  };

  const pluralize = (count, one, few, many) => {
    if (count === 1) {
      return one;
    } else if (count >= 2 && count <= 4) {
      return few;
    } else {
      return many;
    }
  };

  const sortedBlog = [...blog].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlog.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedBlog.length / blogsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 9; // Максимальное количество кнопок до и после текущей страницы

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxPageNumbers - 3) {
        for (let i = 1; i <= maxPageNumbers; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - maxPageNumbers + 2) {
        for (let i = totalPages - maxPageNumbers + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - Math.floor(maxPageNumbers / 2); i <= currentPage + Math.floor(maxPageNumbers / 2); i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers.map((number) => (
      <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
        {number}
      </button>
    ));
  };
  const [totalBlogs, setTotalBlogs] = useState(blog.length);
  useEffect(() => {
    setTotalBlogs(blog.length); // Обновляем общее количество блогов
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
  
    return () => {
      clearInterval(timer);
    };
  }, [blog]); 
  // Функция для определения правильного окончания слова "блог"
function getBlogWordEnding(count) {
  if (count === 1) {
    return 'блог';
  } else if (count > 1 && count < 5) {
    return 'блога';
  } else {
    return 'блогов';
  }
}
  return (
    <>
      <div className='short-blog'>
        <label  className='short-head'>
           <p  className='short-center-text'>
            <img  style={{marginRight:"5px"}} className='header-add' alt="" src='https://cdn2.iconfinder.com/data/icons/office-125/1000/news-1024.png' />
           Всего {totalBlogs} {getBlogWordEnding(totalBlogs)}</p>
         <div className='short-center-text'> Сортировать по:<img  style={{marginRight:"5px"}} className='header-add' alt="" src='https://www.svgrepo.com/show/379655/sort-amount-down.svg' /><div className='custom-select'> 
          <select id='ddlProducts' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value='newest'>Новые записи</option>
            <option value='oldest'>Старые записи</option>
          </select></div></div>
        </label>
      </div>
      <div className='main-center'>
        {currentBlogs.length === 0 ? (
          <p>Нет блогов</p>
        ) : (
          <>
            {currentBlogs.map((e) => (
              <div className='blog' key={e.id}>
                <div className='blog-w' title={e.id}>
                  
                    <div className='blog-title'>
                      <h2 className='mrl' style={{ color: 'rgb(68 67 67)', fontFamily: "system-ui"}}>
                        {e.title}
                      </h2>
                     
                    </div>
                    <p className='mrl text-blog'>
                      {e.body.length > 50 ? e.body.slice(0, 250) + '...' : e.body}
                    </p><div className='short-head'>
                    <p className='date'>{formatDate(new Date(e.date))}</p> <span className='author-name short-center-text'> <img  style={{marginRight:"5px",width:"15px"}} className='header-add' alt="" src='https://www.pikpng.com/pngl/b/167-1671043_ykle-wode-svg-png-icon-free-download-edit.png' />
           Автор: {e.author}</span></div>
           <Link to={`/blogs/${e.id}`}>
                    <button className='button'>читать дальше...</button>
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className='pagination'>
        {currentPage > 5 && (
          <>
            <button onClick={() => paginate(1)}>1</button>
            <span>...</span>
          </>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages - 8 && (
          <>
            <span>...</span>
            <button onClick={() => paginate(totalPages)}>{totalPages}</button>
          </>
        )}
      </div>
    </>
  );
};

export default BlogList;
