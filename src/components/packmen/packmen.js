import React from 'react'

import './packmen.css'

const Packmen = () => {
  return (
    <> 
      
      <div className="lds-css ng-scope">
      <div className="lds-pacman">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div className='load'>Loading...</div> 
    </>
  )
}

export default Packmen