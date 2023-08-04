import React, { useState } from 'react';
import "./head.css";
import menu from "../../assets/menu.png"

const Head = () => {
    const options = ["Book", "Info","Check-in", "Login"]
  return (
    <div className="head">
        <h1>Ether <span>Jet</span></h1>
        <ul className='head-options'>
            {
                options.map((option) => (
                    <li key={option}>
                        <h3>{option}</h3>
                    </li>
                ))
            }
        </ul>
        <img className='menu-img' src={menu} width={30} alt='menu'/>
    </div>
  );
};

export default Head;
