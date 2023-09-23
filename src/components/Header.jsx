import React from "react";
import { NavLink,Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <Link to="/" ><div className="logo">Logo</div></Link>
      <div className="navigation">
        <ul style={{display:"flex"}}>
          <NavLink to="/" activeClassName="active"><li className="li">Новости</li></NavLink>
          <NavLink to="/Create" activeClassName="active"><li className="li">Создать блок</li></NavLink>
          <NavLink to="/Page" activeClassName="active"><li className="li">Функции</li></NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
