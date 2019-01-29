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
import Loader from '../components/Loader'

import withContext from '../WithContext'

const tabsText =  [LIST_VIEW, CHART_VIEW]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: tabsText[0]
    }
  }

  componentDidMount() {
    this.props.actions.getInitalData()
  }
 
  changeView = (index) => {
    this.setState({
      tabView: tabsText[index]
    })
  }
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
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
    const { items, categories, currentDate, isLoading } = data
    const { tabView } = this.state

    const tabIndex = tabsText.findIndex(tabText => tabText === tabView)
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })

    let totalInCome = 0, totalOutCome = 0
    itemsWithCategory.forEach(item => {
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
          { isLoading &&
            <Loader />
          }
          { !isLoading &&
            <Fragment>
              <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
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
              { tabView === LIST_VIEW && itemsWithCategory.length > 0 &&
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
              }
              { tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
                <div className="alert alert-light text-center no-record">
                  您还没有任何记账记录
                </div>
              }
              { tabView === CHART_VIEW &&
                <h1>Chart Model</h1>
              }
            </Fragment> 
          }
          
        </div>
      </Fragment>
    )
  }
}

export default withRouter(withContext(Home))