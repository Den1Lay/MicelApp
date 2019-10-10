import axios from 'axios'

const getData = dispatch => token => {
  let data = {
    
  }
  const checker = path => {
    console.log(path)
    axios
      .get( path, {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        let mainData = res.data['_embedded']['items']
        console.log(mainData)
        mainData.forEach(obj => {
          if(obj['type'] === 'file') {
            let fold = obj['path'].split('/')
            let pathToBottom = fold.slice(0, fold.length - 1)
            let name = obj.name.substring(0, obj.name.indexOf('.') - 1)
            let mut = data //мутирующий клон
            let i = 0
            while(pathToBottom.length > 1) {
              i++
              mut = mut[pathToBottom[i]] = {...mut[pathToBottom[i]]}
            }
            mut[pathToBottom[0]] = {...mut[pathToBottom[0]], [name]: obj}
            
          } else if(obj['type'] === 'dir') {
            let dls = obj.path.split('/')
            let lastDls = dls[dls.length - 1]
            checker(`${path}${lastDls}%2F`)
          }
          console.log(data)
        })
      })
      .catch(err => console.log('Error: ' + err))
  }
  checker('https://cloud-api.yandex.net:443/v1/disk/resources?path=disk%3A%2F')
  
}

const addData = data => {
  
}


export {
  getData,

}