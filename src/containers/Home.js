import React, { Component, Fragment } from 'react';
import logo from '../logo.svg';

import { 
  LIST_VIEW, CHART_VIEW, 
  TYPE_INCOME, TYPE_OUTCOME 
} from '../utility'
import PriceList from "../components/PriceList" 
import ViewTab from "../components/ViewTab"
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'

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
}, {
  "id": 3,
  "title": "去云南旅游",
  "price": 500,
  "date": "2019-1-22",
  "category": {
    "id": 1,
    "name": "旅游",
    "type": "income",
    "iconName": "ios-plane"
  }
}]

class Home extends Component {
  render() {
    let totalInCome = 0, totalOutCome = 0
    items.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutCome += item.price
      } else {
        totalInCome += item.price
      }
    })

    return (
      <Fragment>
        <header className="App-header">
          <div className="row mb-5">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React Keep Book</h1>
          </div>
          <div className="row">
            <div className="col">
              <MonthPicker
                year={2018}
                month={8}
                onChange={() => {}}
              />
            </div>
            <div className="col">
              <TotalPrice
                income={totalInCome}
                outcome={totalOutCome}
              />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <ViewTab 
            activeTab={LIST_VIEW}
            onTabChange={() => {}}
          />
          <CreateBtn
            onClick={() => {}}
          />
          <PriceList
            items={items}
            onModifyItem={() => {}}
            onDeleteItem={() => {}}
          />
        </div>
      </Fragment>
    )
  }
}

export default Home