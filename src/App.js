import React, { Component, createContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { 
  flattenArr, 
  produceId,
  parseToYearAndMonth
} from './utility'
import Home from './containers/Home'
import Create from './containers/Create'

export const AppContext = createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth()
    }
    this.actions = {
      getInitalData: async () => {
        this.setState({
          isLoading: true
        })
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])

        const [ categories, items ] = results
        this.setState({
          items: flattenArr(items.data),
          categories: flattenArr(categories.data),
          isLoading: false
        })
      },
      selectNewMonth: async (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flattenArr(items.data),
          currentDate: { year, month }
        })
        return items
      },
      deleteItem: async (deletedItem) => {
        const deleted = await axios.delete(`/items/${deletedItem.id}`)
        delete this.state.items[deletedItem.id]
        this.setState({
          items: this.state.items
        })
        return deleted
      },
      createItem: (data, categoryId) => {
        const newId = produceId()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid: categoryId }
        this.setState({
          items: { ...this.state.items, [newId]: newItem }
        })
      },
      updateItem: (updatedItem, updatedCategoryId) => {
        const modifiedItem = {
          ...updatedItem,
          cid: updatedCategoryId,
          timestamp: new Date(updatedItem.date).getTime()
        }
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem }
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
