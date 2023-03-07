import React from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '../../components/MenuBar'
import { HomepageButtons } from '../../config/HomeButtons'
import './style.scss'

const Home = () => {
    const navigate = useNavigate()
  
    return (
        <div className="home">
            <div className="nav">
                <img className='logo' src="./images/logo.png" alt="" />
                <Menu />
            </div>
            <div className='main-page'>
                {
                    HomepageButtons.map((item, i) => {
                        return (
                            <button key={i} onClick={() => {
                                navigate(item.url)
                            }} className="register"><p>{item.name}</p></button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home