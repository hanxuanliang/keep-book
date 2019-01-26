import React from 'react'
import { mount } from 'enzyme'
import Home from '../Home'

import { 
  LIST_VIEW, CHART_VIEW, 
  TYPE_INCOME, TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from '../../utility'
import PriceList from "../../components/PriceList" 
import ViewTab from "../../components/ViewTab"
import TotalPrice from '../../components/TotalPrice'
import MonthPicker from '../../components/MonthPicker'
import CreateBtn from '../../components/CreateBtn'

let wrapper

describe('test Home conatianer component', () => {
  beforeEach(() => {
    wrapper = mount(<Home />)
  })
  it('should render the dafault layout',() => {
    expect(wrapper.find(PriceList).length).toEqual(1)
  })
})