import axios from 'axios'

const getData = dispatch => token => {

  let data = {}  // в этот объект буду записаны папки в виде объктов, а в объекте папок будут записаны объекты файлов. Объект в объекте)
  let inAir = []
  let folders = []                                                // {disk: {file1: {}, file2: {} folder: {
                                                                  //          nestedFile1: {}
  const checker = path => {                                      //        }}}
    inAir.push('check')   // главная функция - checker - рекурсивная, ==> запимаем что была создана новая ветвь вызова
    axios
      .get( path, {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {                                      
        let mainData = res.data['_embedded']['items'] // Получаем данные в виде [{}, {}, {}]
        mainData.forEach(obj => {
          if(obj['type'] === 'file') {
            let fold = obj['path'].split('/')
            let pathToBottom = fold.slice(0, fold.length - 1)
            let name = obj.name.substring(0, obj.name.indexOf('.'))      
            let mut = data              // создаем экземпляр объекта в который можем вносить изменения, 
                                        //которые в последующем появятся в data
            while(pathToBottom.length > 1) {     // углубляемся в объект пока не дойдем до места хранения файла
              mut = mut[pathToBottom[0]] = {...mut[pathToBottom[0]]}  // попутно объявляем названия папок
              pathToBottom.shift()                                    // файл падая вниз создает за собой папки, что у него в path...
            }
            mut[pathToBottom[0]] = {...mut[pathToBottom[0]], [name]: obj} //записываем файл

          } else if(obj['type'] === 'dir') {                
            let folderPath = obj.path.split('/')     // так как есть папки без файлов, необходимо 
            let folderMut = data                    //повторно пересоздать папки, для каждой папки
            while(folderPath.length > 0) {                          
              folderMut = folderMut[folderPath[0]] = {...folderMut[folderPath[0]]}
              folderPath.shift()
            }
            folders.push(obj.name)
            let dls = obj.path.split('/')
            let lastDls = dls[dls.length - 1]  //оформляем новый запрос для прочтения содержимого папки
            checker(`${path}${lastDls}%2F`)    // соотственно цикл из рекурсивных функий пока не будут обработаны все папки
          }
          console.log("RES",data)                     
        })
        inAir.shift()                   // вызов обработан, значит рипаем его в масcиве
        //console.log('INAIR',inAir)
        if(inAir.length === 0)  { //ловим момент, когда все вызовы обработаны
          
          //console.log('FOLDERS',folders)
          dispatch({
            type: 'ADD_DATA',
            data,
            folders,
            token,
          })
        }
      })
      .catch(error => error === 'Network Error' 
      ? dispatch({
        type: 'ERROR_LOAD_DATA',
        error
      })
      : null)
  }
  checker('https://cloud-api.yandex.net:443/v1/disk/resources?path=disk%3A%2F')
}

const loadData = data => ({
  type: 'LOAD_DATA'
})


export {
  getData,
  loadData
}