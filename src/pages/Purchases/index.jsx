import React from 'react'
import './style.scss'
import ScannerPage from '../../components/scannerPage'

const MakePurchase = () => {
  return (
    <div className='make-purchase-page'>
        <ScannerPage subHeading={""} to="addpurchase"/>
    </div>
  )
}

export default MakePurchase