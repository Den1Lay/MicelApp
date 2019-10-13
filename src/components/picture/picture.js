import React from 'react'

import './picture.css'

const Picture = props => {
console.log('INSAD',props.pass.preview) 
  return (
    <div className='picture'>
      <img src={`${props.pass.preview}`} alt='Попробуйте в яндекс браузере..' />
    </div>
  )
}

export default Picture