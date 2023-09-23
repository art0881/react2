import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Рашид');
    const [loading,setLoading] = useState('');
    const navigate = useNavigate();
    
    const handleSumbit =(e)=>{
        e.preventDefault();
        setLoading(true);
        const blog = {title,body,author}
       fetch('http://localhost:8000/blog', {
       method: 'Post',
       headers: {"Content-Type":"application/json"},
       body: JSON.stringify(blog)
    }).then(()=>{
        console.log("блог отправлен");
        setLoading(false);
        navigate('/');
    })
    
}
       
  return (
    <div><h1>Создать блог</h1>
    <form onSubmit={handleSumbit}>
        <div className='form'>
        <label><h3>Названия блога</h3></label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="input" type='text' required/>
        <label><h3>Текс блога</h3></label>
        <textarea value={body} onChange={(e)=>setBody(e.target.value)} className="input" type='text' required/>
        <div className='form-author'>
        <label style={{marginRight:"10px"}}><h3>Выбор автора</h3></label>
        <select value={author} onChange={(e)=>setAuthor(e.target.value)} style={{padding:"5px", fontSize:"15px"}}>
            <option value="Рашид">Рашид</option>
            <option value="мага">Мага</option>
        </select>
        </div>
        {!loading && <button>Добавить блог</button>}
        {loading && <button disabled>Блог добавляется...</button>}
        </div>
    </form>
    </div>
  )
}

export default Create;