import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import CategorySelect from '../components/CategorySelect'
import { Tabs, Tab } from '../components/Tabs'
import PriceForm from '../components/PriceForm'

import withContext from '../WithContext'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
      validationPassed: true
    }
  }

  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index]
    })
  }
  selectCategory = (category) => {
    this.setState({
      selectedCategory: category
    })
  }
  cancelSubmit = () => {
    this.props.history.push('/')
  }
  submitForm = (data, isEditMode) => {
    // 注意选择分类，可能是一个bug
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false
      })
      return;
    }
    if (!isEditMode) {
      // create
      this.props.actions.createItem(data, this.state.selectedCategory.id)
    } else {
      // update
    }
    this.props.history.push('/')
  }

  render() {
    const { data } = this.props
    const { items, categories } = data
    const { selectedTab, validationPassed } = this.state

    const filterCategories = Object.keys(categories)
      .filter(id => categories[id].type === selectedTab)
      .map(id => categories[id])

    return (
      <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fffff'}}>
        <Tabs activeIndex={0} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect 
          categories={filterCategories} 
          onSelectCategory={this.selectCategory} />
        <PriceForm 
          onFormSubmit={this.submitForm} 
          onCancelSubmit={this.cancelSubmit} />
        { !validationPassed &&
          <div className="alert alert-danger mt-5" role="alert">
            请选择分类信息
          </div>
        }
      </div>
    )
  }
}

export default withRouter(withContext(Create))