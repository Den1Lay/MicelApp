import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import {getData} from '../../redux/actions'

import Header from '../header'
import Container from '../container'
import Picture from '../picture'
import Preview from '../preview'
import './app.css';

class App extends Component {
                                      // Для большей наглядности происходящего не стал разбивать 
                                      // все на компоненты
                                
  getRoutes = () => {
    let routes = []
    let data = this.props.data;
    if(Object.keys(data).length === 0) return []
    let inAir = []
    const getter = (data, relPath='') => {                //получаю массив всех путей папок
      inAir.push('123')
      for(let prop in data) {
        if(data[prop].type === undefined) {
          let newPath = `${relPath}/${prop}`.replace(/:/g, '')
          routes.push({path: `${newPath}`, data: data[prop]})
          getter(data[prop], newPath)
        }
      }
      inAir.shift()
    }
    getter(data)
    if(inAir == false) return routes
  }   
                                        //создаю роуты для полученных путей
  render() {
    return (
      <div className="App">
        <Header />                                
        <Route exact path='/' component={Preview}/>
          {this.getRoutes().map(({path, data}, i) => <Route key={path} exact path={path} render={({match, location, history}) => <Container data={data} loc={location} />} />)}
          {this.getRoutes().map(({path, data}, i) => <Route key={path} exact path={`${path}/:id`} render={({match, location, history}) => {
            let {id} = match.params
            let pass = data[id.slice(0, id.indexOf('.'))]
            if(this.props.folders.indexOf(id) === -1) return <Picture pass={pass}/>
          }} />)}
      </div>
    )
  }
}
const mapState = state => ({data: state.data, path: state.path, folders: state.folders, loading: state.loading})
const mapDispatch = dispatch => ({
  getData: (token) => getData(dispatch)(token)
})

export default connect(mapState, mapDispatch)(App)