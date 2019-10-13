import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import {getData, loadData} from '../../redux/actions'

import Packmen from '../packmen'
import './preview.css'

class Preview extends React.Component {
  state = {
    value: 'AgAAAAAjMRpNAADLWzTYVY9n9EcygVbADLb0EfE'
  }

  submitHandler = event => {
    event.preventDefault()
    this.props.getData(this.state.value)
    this.props.loadData()
  }


  changeHandler = event => {
    event.persist()
    console.log(event.target.value)
    this.setState({value: event.target.value})
  }

  render() {
    if(this.props.token !== null ) this.props.history.push('/disk')
    console.log('PROOPS', this.props)
    return (
      <>
        <form className='main-form' onSubmit={this.submitHandler}>
          <label className='main-label' for='main-input'>Token: </label>
          <input type="text" 
                value={this.state.value} 
                className="form-control main-input"
                id="main-input"
                placeholder="Token"
                onChange={this.changeHandler}></input>
          <button className='btn btn-outline-primary' type='submit'>$UBMIT</button>
        </form>
        {this.props.loading ? <Packmen /> : null}
      </>
    )
  }
}
const mapDispatch = dispatch => ({
  getData: (token) => getData(dispatch)(token),
  loadData: () => dispatch(loadData())
}),
mapState = state => ({token: state.token, loading: state.loading})

export default withRouter(connect(mapState, mapDispatch)(Preview))