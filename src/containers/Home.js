import React, { Component, Fragment } from 'react';
import logo from '../logo.svg';
import Ionicon from 'react-ionicons'

import { 
  LIST_VIEW, CHART_VIEW, 
  TYPE_INCOME, TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from '../utility'
import PriceList from "../components/PriceList" 
import ViewTab from "../components/ViewTab"
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { Tabs, Tab } from '../components/Tabs'

import { AppContext } from '../App'

const categories = {
  "1": {
    "id": 1,
    "name": "旅游",
    "type": "outcome",
    "iconName": "md-plane"
  }, 
  "2": {
    "id": 1,
    "name": "旅游",
    "type": "outcome",
    "iconName": "ios-plane"
  },
  "3": {
    "id": 1,
    "name": "旅游",
    "type": "income",
    "iconName": "ios-plane"
  }
}

const items = [{
  "id": 1,
  "title": "去云南旅游",
  "price": 200,
  "date": "2019-01-23",
  "cid": 1
}, {
  "id": 2,
  "title": "去云南旅游",
  "price": 400,
  "date": "2019-01-22",
  "cid": 2
}, {
  "id": 3,
  "title": "去云南旅游",
  "price": 500,
  "date": "2019-10-22", 
  "cid": 3
}]

const newItem = {
  "id": 4,
  "title": "带妈妈去旅游",
  "price": 1500,
  "date": "2019-10-22", 
  "cid": 1
}

const tabsText =  [LIST_VIEW, CHART_VIEW]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: tabsText[0]
    }
  }

  changeView = (index) => {
    this.setState({
      tabView: tabsText[index]
    })
  }
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month }
    })
  }
  modifyItem = (modifiedItem) => {
    const modifiedItems = this.state.items.map(item => {
      if (item.id === modifiedItem.id) 
        return { ...item, title: '买小米手机'}
      else 
        return item
    })
    this.setState({
      items: modifiedItems
    })
  }
  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    })
  }
  deleteItem = (deletedItem) => {
    const filterItems = this.state.items.filter(item => item.id !== deletedItem.id)
    this.setState({
      items: filterItems
    })
  }

  render() {
    const { items, currentDate, tabView } = this.state
    const itemWithCategory = items.map(item => {
      item.category = categories[item.cid]
      return item
    }).filter(item => {
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })
    let totalInCome = 0, totalOutCome = 0
    itemWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutCome += item.price
      } else {
        totalInCome += item.price
      }
    })

    return (
      <AppContext.Consumer>
        {({ state }) => {
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
                      year={currentDate.year}
                      month={currentDate.month}
                      onChange={this.changeDate}
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
              <Tabs activeIndex={0} onTabChange={this.changeView}>
                <Tab>
                  <Ionicon 
                    className="rounded-circle mr-2"
                    fontSize="30px"
                    color={'#007bff'}
                    icon="ios-paper"
                  />
                  列表模式
                </Tab>
                <Tab>
                  <Ionicon 
                    className="rounded-circle mr-2"
                    fontSize="30px"
                    color={'#007bff'}
                    icon="ios-paper"
                  />
                  图表模式
                </Tab>
              </Tabs>
              <ViewTab 
                activeTab={tabView}
                onTabChange={this.changeView}
              />
              <CreateBtn onClick={this.createItem} />
              { tabView === LIST_VIEW &&
                <PriceList
                  items={itemWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
              }
              { tabView === CHART_VIEW &&
                <h1>Chart Model</h1>
              }
            </div>
            </Fragment>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Home