import React from 'react'
import './Menu.css'
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">Tareas</NavLink>
          </li>
          <li>
            <NavLink to="/Temporizador" exact activeClassName="active">Temporizador</NavLink>
          </li>
      </ul>
    </div>
  )
}

export default Menu