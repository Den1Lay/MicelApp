import React from 'react';
import {connect} from 'react-redux'

const Container = props => {
  
  return(
    <div>
      <p>I am here</p>
      <p>{props.data}</p>
    </div>
  )
}

export default connect()(Container)