import React,{useEffect, useState} from 'react';
import BlogList from './BlogList';

const Main = () => {


const [blog,setBlog] = useState( []);
const [loading,setLoading] = useState(true)
const [err,setErr] = useState(false)


useEffect(()=>{
  const abortCont = new AbortController();
  const signal = abortCont.signal;
  fetch('http://localhost:8000/blog',{signal})
  .then(res=> {return res.json()})
  .then(data=>{
    console.log(data);
    setBlog(data);
    setLoading(false);
    setErr(false)
  }).catch(err=>{
   setErr(true)
   setLoading(false);
  });
  return ()=> abortCont.abort();
},[])

  return ( 
    <div className='main_center'>
      <h1>Все блоги {blog.length}</h1>
    {err && <div>Ошибка вывода данных</div>}
    {loading && <div>Загрузка...</div>}
    {blog && <BlogList blog={blog} />}
       
    </div>
  )
}

export default Main;