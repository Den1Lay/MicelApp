import React from 'react'
import {} from 'react-router-dom';

const Picture = props => {
console.log('INSAD',props.pass.preview)
  return (
    <div>
      <img src={'http://downloader.disk.yandex.ru/preview/45c31ab8fd53fbed0faa6a4dae990843f77959ccb10de2d2e826e917b9b3075a/inf/e4WTSuwXNwLjbjwaWi1vXFuQ-biYzXHMfURW4VIc4rmBxZhGf6N5b4MEf_ueh3VwZDJ7I3Qq7cU45yvpQs5vyA%3D%3D?uid=590420557&filename=%D0%9C%D0%BE%D1%80%D0%B5.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=590420557&tknv=v2&size=S&crop=0'} />
      <img src={`${props.pass.preview}`} alt="Go to YANDEX browser" />
    </div>
  )
}

export default Picture