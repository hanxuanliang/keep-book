import React, { Component, Fragment } from 'react';
import logo from '../logo.svg';
import Ionicon from 'react-ionicons'
import { withRouter } from 'react-router-dom'

import { 
  LIST_VIEW, CHART_VIEW, 
  TYPE_INCOME, TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from '../utility'
import PriceList from "../components/PriceList" 
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { Tabs, Tab } from '../components/Tabs'

import { AppContext } from '../App'
import withContext from '../WithContext'

const tabsText =  [LIST_VIEW, CHART_VIEW]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  createItem = () => {
    this.props.history.push('/create')
  }
  modifyItem = (modifiedItem) => {
    this.props.history.push(`/edit/${modifiedItem.id}`)
  }
  deleteItem = (deletedItem) => {
    this.props.actions.deleteItem(deletedItem)
  }

  render() {
    const { data } = this.props
    const { items, categories } = data
    const { currentDate, tabView } = this.state
    const itemWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
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
  }
}

export default withRouter(withContext(Home))