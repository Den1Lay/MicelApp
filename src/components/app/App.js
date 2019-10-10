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
    return (
      <div className="App">
        <Header />
        <p>Wellcome</p>
      </div>
    );
  }
}
const mapState = state => ({state})
const mapDispatch = dispatch => ({
  getData: (token) => getData(dispatch)(token)
})

export default connect(mapState, mapDispatch)(App)