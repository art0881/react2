import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: '',
    body: '',
    author: ''
  });

  useEffect(() => {
    // Здесь загрузите данные блога по id и установите их в состояние blog
    // Пример загрузки данных:
    fetch(`http://localhost:8000/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправьте обновленные данные блога на сервер
    fetch(`http://localhost:8000/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
      .then(() => {
        navigate(`/blogs/${id}`);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
      });
  };

  return (
    <div className="main-center">
      <div className="blog-det" style={{ width: '90%' }}>
        <div className="header w97">
          <Link to={`/blogs/${id}`}>
            <button className="nav-blog">{"<"} ОТМЕНА  </button>
          </Link>
          <h3 style={{ width: '65%' }}>Редактировать запись</h3>
        </div>
        <form style={{padding:"0 20px 20px 20px"}} onSubmit={handleSubmit}>
          <div className="form">
            <label>
              <h3>Заголовок:</h3>
            </label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              className="input"
              required
            />
            <label>
              <h3>Текст блога:</h3>
            </label>
            <textarea
              name="body"
              style={{height:"100px"}}
              value={blog.body}
              onChange={handleChange}
              className="input"
              required
            />
            <label>
              <h3>Автор: {blog.author}</h3>
            </label>
            <input
              name="author"
              value={blog.author}
              onChange={handleChange}
              className="input"
              required
            />
            <button  style={{ marginTop: '40px' }} className="button p15">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
