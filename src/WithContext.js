import React from 'react'
import { AppContext } from './App'

const withContext = (Component) => {
  return (props) => 
    <AppContext.Consumer>
      {({ state }) => {
        return <Component {...props} data={state} />
      }} 
    </AppContext.Consumer>
}

export default withContext