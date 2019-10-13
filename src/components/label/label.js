import React from 'react';
import {withRouter} from 'react-router-dom'

import './label.css'

const Label = ({history, url, src, name}) => {
  console.log()
  const Nine = () => {
    return(
      <div className='label' >
        <img src={src} alt='Поробуйте ' />
        {name.length > 15                           // Получаем сокращенное название файла
          ? <span title={name}>{name.substring(0, Math.min(10, name.lastIndexOf('.')))+name.substring(name.lastIndexOf('.'))}</span> 
          : <span>{name}</span>}
      </div>
    )
  }
  return(
    url !== undefined 
    ? <a onClick={() => history.push(url)}>
      {Nine()}
    </a>
    : Nine()
  )
}

export default withRouter(Label)