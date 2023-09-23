import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Page from './components/Page';
import { Routes, Route } from 'react-router-dom';
import BlogDetails from './components/BlogDetails';
import Create from './components/Create';
import Page404 from './components/Page404';

function App() {
return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/Page' element={<Page/>}/>
        <Route path='/Create' element={<Create/>}/>
        <Route path='/blogs/:id' element={<BlogDetails/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>

    </div>
  );
}

export default App;
