import React from 'react';
import {Link} from 'react-router-dom'

const Container = ({data, loc}) => {
  console.log(data)
  console.log('loc', loc.pathname)
  const getItems = () => {
    let resData = []
    let metaData = data
    for (let prop in metaData) {
      if(metaData[prop].type === undefined) {
        resData.push(<div key={prop}><Link to={`${loc.pathname}${prop}/`}>Folder: {prop}</Link></div>) // data = {metaData[prop]}
      } else {
        resData.push(<div key={prop}>File: {prop}</div>)
      }
    }
    return resData
  }
  console.log(getItems())
  return(
    <div>
      {getItems()}
    </div>
  )
}

export default Container