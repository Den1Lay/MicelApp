import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'

import {getData} from '../../redux/actions'

import Header from '../header'
import Container from '../container'
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.getData('AgAAAAAjMRpNAADLWzTYVY9n9EcygVbADLb0EfE')
  }

  getRoutes = () => {
    let routes = []
    let data = this.props.data;
    if(Object.keys(data).length === 0) return []
    let inAir = []
    const getter = (data, relPath='') => {
      inAir.push('123')
      for(let prop in data) {
        if(data[prop].type === undefined) {
          let newPath = `${relPath}${prop}/`.replace(/:/g, '')
          console.log(newPath)
          routes.push({path: `/${newPath}`, data: data[prop]})
          getter(data[prop], newPath)
        }
      }
      inAir.shift()
    }
    getter(data)
    if(inAir == false) return routes
  }
  
  render() {
    const {data, path} = this.props
    if(Object.keys(data).length !== 0) {
      console.log('APPP', data)
      console.log('PATH', path)
      let newData = data
      while(path.length > 1) {
        newData = {...newData[path[0]]}
        path.shift()
      }
      newData = newData[path[0]]
      console.log('NEWNEW ', newData)
    }
    console.log(this.getRoutes())
    return (
      <div className="App">
        <Link to='/disk/Загрузки/'>REDIR</Link>
        <Link to='/disk/'>HOME</Link>
        <img src={'https://downloader.disk.yandex.ru/preview/bdb74aaa608fc593d39c9bf8745fd0f0d25178472657b028f55795ac5055efbe/inf/PNec8rFbFd0WPJMSAfUc7pNiNSME7Q0O0DrXr5-IhMgAOITNajybxvIo7yfrDcZbCvINiUpbWSnJA594N-sTjQ%3D%3D?uid=590420557&filename=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=590420557&tknv=v2&size=S&crop=0'} />
        <Header />
        <Route path='/home' render={() => <Container data={'Free data'}/>} />
        {this.getRoutes().map(({path, data}, i) => <Route key={path} exact path={path} render={({match, location, history}) => <Container data={data} loc={location} />} />)}
        {/* {[1, 2, 3, 4].map(el => <Route path={`/${el}`} render={() => <h2>{el}</h2>}/>)} */}
      </div>
    );
  }
}
const mapState = state => ({data: state.data, path: state.path})
const mapDispatch = dispatch => ({
  getData: (token) => getData(dispatch)(token)
})

export default connect(mapState, mapDispatch)(App)