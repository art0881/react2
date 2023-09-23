import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const BlogDetails = () => {
    const {id} = useParams();
    const [blog,setBlog] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:8000/blog/${id}`)
        .then(res=>{return res.json()})
        .then(data=>{
         setBlog(data);
        })
    });
    
const handleDelete =()=>{
    fetch(`http://localhost:8000/blog/${id}`,{
        method:'DELETE'
    }).then(()=>{
     navigate('/');
    })
}
  return (
    <div className='blog-details'><div className='flex'>
        <h1><Link style={{color:"red"}}  to="/">{"<"} НАЗАД |</Link></h1>
        <h1>Открытый блог {id}</h1>
        <button style={{cursor:"pointer"}} onClick={handleDelete}> | Удалить</button>
        </div>
    {blog && (
        <div>
            <h2> {blog && blog.title } </h2>
<p> Написал { blog && blog.author } </p> 
<div> {blog && blog.body} </div>
        </div>
    )}
    </div>
  )
}

export default BlogDetails;