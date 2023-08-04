import React, { useState } from 'react';
import "./head.css";
import menu from "../../assets/menu.png"
import plane from "../../assets/etherJet.png"
import Menu from '../Menu/Menu';

const Head = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const options = ["Book", "Info","Check-in", "Login"];
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const toggleClose = () => {
        setMenuOpen(false);
    }
  return (
    <div className="head">
        <div className='head-title'>
            <img src={plane} width={35} alt='ether'/>
            <h1>Ether <span>JET</span></h1>
        </div>
        <ul className='head-options'>
            {
                options.map((option) => (
                    <li key={option}>
                        <h3>{option}</h3>
                    </li>
                ))
            }
        </ul>
        <div className='menu-img'>
            <img style={{cursor: "pointer"}} onClick={toggleMenu}  src={menu} width={30} alt='menu'/>
            {menuOpen && <Menu options={options} close= {toggleClose}/>}
        </div>
    </div>
  );
};

export default Head;
