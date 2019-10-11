import React, {Component} from 'react';
import {connect} from 'react-redux'

import {getData} from '../../redux/actions'

import Header from '../header'
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.getData('AgAAAAAjMRpNAADLWzTYVY9n9EcygVbADLb0EfE')
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

    return (
      <div className="App">
        <img src={'https://downloader.disk.yandex.ru/preview/bdb74aaa608fc593d39c9bf8745fd0f0d25178472657b028f55795ac5055efbe/inf/PNec8rFbFd0WPJMSAfUc7pNiNSME7Q0O0DrXr5-IhMgAOITNajybxvIo7yfrDcZbCvINiUpbWSnJA594N-sTjQ%3D%3D?uid=590420557&filename=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=590420557&tknv=v2&size=S&crop=0'} />
        <Header />
        <p>Wellcome</p>
      </div>
    );
  }
}
const mapState = state => ({data: state.data, path: state.path})
const mapDispatch = dispatch => ({
  getData: (token) => getData(dispatch)(token)
})

export default connect(mapState, mapDispatch)(App)