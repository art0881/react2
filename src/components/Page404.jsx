import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div>
        <div className='not-page'>
        <h1 >страница не найдена</h1>
        <Link to="/"><button>Домой</button></Link>
    </div>
    </div>
  )
}

export default Page404