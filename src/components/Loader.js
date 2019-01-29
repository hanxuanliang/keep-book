import React from 'react'
import Ionicon from 'react-ionicons'

const Loader = () => 
  <div className="loading-component text-center">
    <Ionicon 
      icon="ios-refresh"
      fontSize="40px"
      coloer="#347eff"
      rotate={true}
    />
    <h5>加载中</h5>
  </div>

export default Loader