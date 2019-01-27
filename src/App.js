import React, { Component, createContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { flattenArr } from './utility'
import { testItems, testCategories } from './testData';
import Home from './containers/Home'
import Create from './containers/Create'

export const AppContext = createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flattenArr(testItems),
      categories: flattenArr(testCategories)
    }
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state
      }}>
        <Router>
          <div className="App"> 
            <div className="container pb-5">
              <Route path='/' exact component={Home} />
              <Route path='/create' exact component={Create} />
              <Route path='/edit/:id' exact component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
