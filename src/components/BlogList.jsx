import React from 'react'
import { Link } from 'react-router-dom';
const BlogList = ({blog}) => {
  const reversedBlog = [...blog].reverse();

  return (
    <> 
    <div>{reversedBlog.map((e)=>(
        <div title={e.id} key={e.id}>
          <Link to={`/blogs/${e.id}`}>
          <h1 style={{ color: 'red'}}>{e.title}</h1><p>{e.body.length > 50 ? e.body.slice(0, 50) + '...' : e.body}</p>
          </Link>
        </div>
    ))} 
    </div>
    </>
  )
}

export default BlogList;