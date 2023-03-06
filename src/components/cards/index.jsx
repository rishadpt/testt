import React from 'react'
import { getDate } from '../../services/getDate'
import './style.scss'

const Card = ({ data }) => {
  
  return (
    <div className='card'>
      <div className="top">
        <h1> {data.amt} <span>kr</span></h1>
      </div>
      <div className="bottom">
        <div className="card-holder-details">
          <h3 className='card-no'>{data.cn}</h3>
          <h2 className='card-name'>{data.cstn}</h2>
          <p className='card-exp'>Exp : {getDate(data?.ts)}</p>
        </div>
        <p className="vendor">Abrahamsbergs cafe</p>
      </div>
    </div>
  )
}

export default Card