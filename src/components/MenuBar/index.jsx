import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className="menu">
            <div className="menuIcon">
                <img style={{ width: showMenu && "20px" }} onClick={() => setShowMenu(!showMenu)} src={`/images/${showMenu ? "close" : "menu"}.png`} alt="" />
            </div>
            {showMenu &&
                <ul>
                    <Link to="/"><li>Register</li></Link>
                    <Link to="/cards"><li>Cards</li></Link>
                    <Link to="/purchases"><li>Transaction</li></Link>
                    <li>Settings</li>
                </ul>
            }
        </div>
    )
}

export default Menu 