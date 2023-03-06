import React from 'react'
import'./Button.scss'

export default function Button({type,bg}) {
  return (
   <button className='btn' style={{backgroundColor: `${bg}`}} type={type=== 'Done' ?  null : 'submit'} >{type}</button>
  )
}
