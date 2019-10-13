import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import './header.css'

const Dls = ({token}) => {
  return(
    <>
      <Link to='/disk' className='btn btn-primary redir'>/disk</Link>
      <div><span className='token-label'>Current token:</span>{token}</div>
    </>
  )
}

const Header = ({token}) => {
  return(
    <div className='header'>
      <Link to='/'><h2 className='main-title'><span className='red'>Y</span>andex RESTful API</h2></Link>
      {token !== null ? <Dls token={token}/> : null}
    </div>
  )
}
const mapState = state => ({token: state.token})

export default connect(mapState)(Header)