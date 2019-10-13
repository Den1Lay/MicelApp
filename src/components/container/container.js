import React from 'react';
import Label from '../label'

import folderLogo from '../../image/LittleFolder.png'
import fileLogo from '../../image/PngFile.png'
import pictureLogo from '../../image/Picture.png'
import './container.css'

const Container = ({data, loc}) => {
  const getItems = () => {
    let resData = []
    let metaData = data
    for (let prop in metaData) {  
      if(metaData[prop].type === undefined) {
        resData.push(<Label key={prop} url={`${loc.pathname}/${prop}`} name={prop} src={folderLogo}/>)
      } else if (metaData[prop].media_type === 'image') {
        console.log('PIC',metaData[prop])                                  // к сожалению metaData[prop].preview выдает 403
        resData.push(<Label key={prop} url={`${loc.pathname}/${metaData[prop].name}`} name={metaData[prop].name} src={pictureLogo}/>)
      } else {
        resData.push(<Label key={prop} name={metaData[prop].name} src={fileLogo}/>)
      }
    }
    return resData
  }
  return(
    <div className='container'>
      {getItems()}
    </div>
  )
}

export default Container