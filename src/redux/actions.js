import axios from 'axios'

const getData = dispatch => token => {
  let data = {}
  let inAir = []
  let folders = []
  const checker = path => {
    inAir.push('check')
    //console.log(path)
    axios
      .get( path, {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        let mainData = res.data['_embedded']['items']
        //console.log(mainData)
        mainData.forEach(obj => {
          if(obj['type'] === 'file') {
            let fold = obj['path'].split('/')
            let pathToBottom = fold.slice(0, fold.length - 1)
            //console.log('PATH',pathToBottom)  
            let name = obj.name.substring(0, obj.name.indexOf('.'))
            let mut = data //мутирующий клон
            while(pathToBottom.length > 1) {
              mut = mut[pathToBottom[0]] = {...mut[pathToBottom[0]]}
              pathToBottom.shift()
            }
            mut[pathToBottom[0]] = {...mut[pathToBottom[0]], [name]: obj}

          } else if(obj['type'] === 'dir') {
            folders.push(obj.name)
            let dls = obj.path.split('/')
            let lastDls = dls[dls.length - 1]
            checker(`${path}${lastDls}%2F`)
          }
          console.log("RES",data)
        })
        inAir.shift()
        //console.log('INAIR',inAir)
        if(inAir.length === 0)  {
          
          console.log('FOLDERS',folders)
          dispatch({
            type: 'ADD_DATA',
            data,
            folders
          })
        }
      })
      .catch(err => console.log('Service Error: ' + err))
  }
  checker('https://cloud-api.yandex.net:443/v1/disk/resources?path=disk%3A%2F')
}

const addData = data => {
  
}


export {
  getData,

}