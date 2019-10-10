import React from 'react';
import {connect} from 'react-redux'

const Header = (props) => {
  return(
    <div className='header'>
      <h2>Yandex RESTful API</h2>
    </div>
  )
}
const mapState = state => ({token: state.token})

export default connect(mapState)(Header)