import React from "react";
import { NavLink,Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <Link to="/" ><div className="logo" style={{marginLeft:"20px"}}>Rashid Blog</div></Link>
    
      <div style={{display:"flex"}}>
          <NavLink to="/"  activeClassName="active" className="li short-center-text">Новости</NavLink>
          <NavLink to="/Create" activeClassName="active" className="li short-center-text"><img className="header-add " title="Добавить блог" alt="Добавить блог" src="https://www.svgrepo.com/show/496766/add-square.svg"/></NavLink>
          {/* <NavLink to="/Page" activeClassName="active"><li className="li">Функции</li></NavLink> */}
       
      </div>
    </header>
  );
};

export default Header;
