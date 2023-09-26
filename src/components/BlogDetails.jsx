import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BlogDetails = () => {

    const {id} = useParams();
    const [blog,setBlog] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
      
        fetch(`http://localhost:8000/blog/${id}`, { signal })
          .then((res) => res.json())
          .then((data) => {
            setBlog(data);
          })
          .catch((error) => {
            if (error.name === "AbortError") {
              // Запрос был отменен, ничего не делаем
            } else {
              // Обрабатываем ошибку
            }
          });
      
        return () => {
          // Отменяем запрос при размонтировании компонента
          abortController.abort();
        };
      }, [id]);
    
const handleDelete =()=>{
    fetch(`http://localhost:8000/blog/${id}`,{
        method:'DELETE'
    }).then(()=>{
     navigate('/');
    })
}
const [currentTime, setCurrentTime] = useState(new Date());

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
  return (
    <div className='main-center'><div className='blog-det ' style={{width:"90%"}}><div className='header w97'>
        <Link   to="/"><button className='nav-blog'>{"<"} НАЗАД | </button></Link>
        <h3 style={{width:"55%"}}> {blog && blog.title } </h3>
        <Link to={`/blogs/${id}/edit`}>
        <button className='nav-blog'><img  style={{margin: "0px 1px -5px 0",width:"15px"}}  title='Редактировать' alt="Редактировать" src='https://cdn.onlinewebfonts.com/svg/img_149740.png' /></button>
      </Link> 
        <button className='nav-blog' onClick={handleDelete}> | Удалить</button>
        </div>
    {blog && (
        <div className='blog-det-text'>
            
<div className='header1'>
  <div className='short-center-text'><h4><img  style={{marginRight:"5px",width:"15px"}}  alt="" src='https://www.pikpng.com/pngl/b/167-1671043_ykle-wode-svg-png-icon-free-download-edit.png' /> 
 Автор: { blog && blog.author } </h4> </div>
 <p className='date'>{formatDate(new Date(blog.date))}</p></div>
<div className='det-text'> {blog && blog.body} </div>
        </div>
    )}
    </div></div>
  )
}

export default BlogDetails;