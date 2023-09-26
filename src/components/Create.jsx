import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const handleSumbit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Создаем объект блога с текущей датой
    const currentDate = new Date().toISOString();
    const blog = { title, body, author, date: currentDate }; // Добавляем поле "date"

    fetch('http://localhost:8000/blog', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log('Блог отправлен');
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Ошибка при отправке блога:', error);
        setLoading(false);
      });
  };

  return (
    <div className='main-center'>
      <div className='create-blog'>
        <div style={{justifyContent:"center"}} className='short-center-text'><h2 style={{ textAlign: 'center' }} >Создать блог </h2>
        <img style={{marginLeft:"10px"}} className="header-add " t
        alt="" src="https://flyclipart.com/thumbs/file-svg-blog-vector-icon-1167425.png"/></div>
        <form onSubmit={handleSumbit}>
          <div className='form'>
            <label>
              <h3>Названия блога :</h3>
            </label>
            <input  value={title} onChange={(e) => setTitle(e.target.value)} className='input' type='text' required />
            <label>
              <h3>Текст блога :</h3>
            </label>
            <textarea  style={{height:"100px"}} value={body} onChange={(e) => setBody(e.target.value)} className='input' type='text' required />
            
              <label style={{ marginRight: '10px' }}>
                <h3>Автор : {author}</h3>
              </label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className='input' type='text' required />
             
            {!loading && <button style={{ marginTop: '20px' }} className='button p15'>
              Добавить
            </button>}
            {loading && (
              <button style={{ marginTop: '20px' }} className='button p15' disabled>
                Блог добавляется...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
