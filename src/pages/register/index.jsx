import React from 'react'
import ScannerPage from '../../components/scannerPage'
import './style.scss'

const Register = () => {
    
    return (
        <div className='register-page'>
            <ScannerPage to="register" subHeading={"Add CArd"}/>
        </div>
    )
}

export default Register