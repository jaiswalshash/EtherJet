import React from 'react';
import "./menu.css";
import closeIcon from "../../assets/close.png"

const Menu = ({options, close}) => {
    const handleClose = () => {
        close();
    }
    const handleOption = (e) => {
        console.log(e);
        // close();
    }
    return(
        <div className='menu'>
            <div className='menu-options'>
                <img onClick={handleClose} width={20} src= {closeIcon} alt='close'/>
                <ul>
                    {
                        options.map((option) => (
                            <li onClick={() => handleOption(option)} key={option}>
                                <h3>{option}</h3>
                            </li>
                        ))  
                    }
                </ul>
            </div>
        </div>
    )
}
export default Menu;