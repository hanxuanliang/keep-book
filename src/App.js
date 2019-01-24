import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import PriceList from "./components/PriceList" 
import ViewTab from "./components/ViewTab"
import TotalPrice from './components/TotalPrice'
import { 
  LIST_VIEW, CHART_VIEW 
} from './utility'

const items = [{
  "id": 1,
  "title": "去云南旅游",
  "price": 200,
  "date": "2019-1-23",
  "category": {
    "id": 1,
    "name": "旅游",
    "type": "outcome",
    "iconName": "md-plane"
  }
}, {
  "id": 2,
  "title": "去云南旅游",
  "price": 400,
  "date": "2019-1-22",
  "category": {
    "id": 1,
    "name": "旅游",
    "type": "outcome",
    "iconName": "ios-plane"
  }
}]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <TotalPrice 
          income={1000}
          outcome={500}
        />
        <ViewTab 
          activeTab={LIST_VIEW}
          onTabChange={(view) => {console.log(view)}}
        />
        <PriceList 
          items={items}
          onModifyItem={(item) => { alert(item.id) }}
          onDeleteItem={(item) => { alert(item.id) }}
        />
      </div>
    );
  }
}

export default App;
