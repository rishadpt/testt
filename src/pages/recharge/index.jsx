import React from 'react'
import './style.scss'
import ScannerPage from '../../components/scannerPage'

const Recharge = () => {
  return (
    <div className='recharge-page'>
        <ScannerPage subHeading={"Recharge"} to="recharge"/>
    </div>
  )
}

export default Recharge