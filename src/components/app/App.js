import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'

import {getData} from '../../redux/actions'

import Header from '../header'
import Container from '../container'
import Picture from '../picture'
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
          let newPath = `${relPath}/${prop}`.replace(/:/g, '')
          console.log(newPath)
          routes.push({path: `${newPath}`, data: data[prop]})
          getter(data[prop], newPath)
        }
      } 
      inAir.shift()
    }
    getter(data)
    if(inAir == false) return routes
  }
  
  render() {
    console.log('ROUTES',this.getRoutes())
    return (
      <div className="App">
        <button>  
          <Link to='/disk'>HOME</Link>
        </button>
        <img src={'https://downloader.disk.yandex.ru/preview/bdb74aaa608fc593d39c9bf8745fd0f0d25178472657b028f55795ac5055efbe/inf/PNec8rFbFd0WPJMSAfUc7pNiNSME7Q0O0DrXr5-IhMgAOITNajybxvIo7yfrDcZbCvINiUpbWSnJA594N-sTjQ%3D%3D?uid=590420557&filename=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=590420557&tknv=v2&size=S&crop=0'} />
        <Header />
        <Route path='/disk/:id' render={({match}) => {
          console.log('DISK MATC', match.params.id)
          return <h3>GO AWAY</h3>
        }} />
        {this.getRoutes().map(({path, data}, i) => <Route key={path} exact path={path} render={({match, location, history}) => <Container data={data} loc={location} />} />)}
        {this.getRoutes().map(({path, data}, i) => <Route key={path} exact path={`${path}/:id`} render={({match, location, history}) => {
          let {id} = match.params
          console.log('THAT DATA',data)
          let pass = data[id.slice(0, id.indexOf('.'))]
          console.log('PASSS', pass)
          if(this.props.folders.indexOf(id) === -1) return <Picture pass={pass}/>
        }} />)}
      </div>
    );
  }
}
const mapState = state => ({data: state.data, path: state.path, folders: state.folders})
const mapDispatch = dispatch => ({
  getData: (token) => getData(dispatch)(token)
})

export default connect(mapState, mapDispatch)(App)