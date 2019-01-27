import React, { Component, createContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { 
  flattenArr, 
  produceId,
  parseToYearAndMonth
} from './utility'
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
    this.actions = {
      deleteItem: (deletedItem) => {
        delete this.state.items[deletedItem.id]
        this.setState({
          items: this.state.items
        })
      },
      createItem: (data, categoryId) => {
        // console.log('haha', data)
        // console.log('cid', categoryId)
        const newId = produceId()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid: categoryId }
        this.setState({
          items: { ...this.state.items, [newId]: newItem }
        })
      }
    }
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
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
