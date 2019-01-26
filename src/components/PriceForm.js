import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isValidDate } from '../utility'

class PriceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      validatePass: true,
      errorMessage: '',
    }
  }

  submitForm = (event) => {
    const { item, onFormSubmit } = this.props
    const editMode = !!item.id
    const title = this.titleInput.value.trim()
    const price = this.priceInput.value.trim() * 1
    const date = this.dateInput.value.trim()
    if (title && price && date) {
      if (price < 0) {
        this.setState({
          validatePass: false,
          errorMessage: '价格数字必须大于0'
        })
      } else if (isValidDate(date)) {
        this.setState({
          validatePass: false,
          errorMessage: '请填写正确的日期格式'
        })
      } else {
        this.setState({
          validatePass: true,
          errorMessage: ''
        })
        if (editMode) {
          onFormSubmit({...item, title, price, date}, editMode)
        } else {
          onFormSubmit({ title, price, date }, editMode)
        }
      }
    } else {
      this.setState({
        validatePass: false,
        errorMessage: '请输入所有必选项'
      })
    }
    event.preventDefault()
  }

  render() {
    const { title, price, date } = this.props.item
    return ( 
      <form onSubmit={(event) => {this.submitForm(event)}} noValidate>
        <div className="form-group">
          <label htmlFor="title">标题 *</label>
          <input 
            type="text" className="form-control"
            id="title" placeholder="请输入标题"
            defaultValue={title}
            ref={(titleInput) => {this.titleInput = titleInput}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">价格 *</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">￥</span>
            </div>
            <input
              type="number" className="form-control"
              defaultValue={price} id="price"
              placeholder="请输入价格"
              ref={(priceInput) => {this.priceInput = priceInput}}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="date">日期 *</label>
          <input 
            type="date" className="form-control"
            id="date" placeholder="请输入日期"
            defaultValue={date} 
            ref={(dateInput) => {this.dateInput = dateInput}}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-3"> 提交 </button>
        <button className="btn btn-secondary" onClick={this.props.onCancelSubmit}> 取消 </button>
        {
          !this.state.validatePass &&
          <div className="alert alert-danger mt-5" role="alert">
            {this.state.errorMessage}
          </div>
        }
      </form>
    )
  }
}

PriceForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onCancelSubmit: PropTypes.func.isRequired,
  item: PropTypes.object
}

PriceForm.defaultProps = {
  item: {}
}

export default PriceForm