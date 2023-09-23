import React from 'react'
import { useState } from 'react';

const Page = () => {
    const [name,setName]=useState("Рашид");
const [age,setAge] = useState(18);

const handleRename =()=>{
  setName("Мага пидар");
  setAge(24);
}
const [text,setText] = useState();

const addText = ()=>{
  setText("Текст вставлен");
} 
  return (
    <>
     <div> {name} {age}</div><br/>
      <button onClick={handleRename}>нажми чтоб поменять имя</button><br/>
      <div>{text}</div>
      <button onClick={addText}>Нажми чтоб вставить текст</button>
      <hr/>
    </>
  )
}

export default Page