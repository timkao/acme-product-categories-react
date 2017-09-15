import React, { Component } from 'react'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      nameValue: '',
      priceValue: '0',
      stockValue: true,
      categoryValue: '',
      disabledSave: true,
      isErr: false
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleStockChange = this.handleStockChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(e) {
    if (e.target.value !== '') {
      this.setState({ nameValue: e.target.value, disabledSave: false })
    }
    else {
      this.setState({ nameValue: e.target.value, disabledSave: true })
    }
  }

  handlePriceChange(e) {
    this.setState({ priceValue: e.target.value })
  }

  handleStockChange(e) {
    this.setState({ stockValue: !this.state.stockValue })
  }

  handleCategoryChange(e) {
    this.setState({ categoryValue: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const requestBody = {
      name: e.target.name.value,
      price: e.target.price.value,
      inStock: e.target.inStock.value === 'on',
      categoryId: e.target.categoryId.value
    }
    this.props.createProduct(requestBody)
      .then(result => {
        this.setState({
          nameValue: '',
          priceValue: '0',
          stockValue: true,
          categoryValue: '',
          disabledSave: true,
          isErr: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isErr: true })
      })
  }

  render() {
    const { categories } = this.props
    const { nameValue, priceValue, stockValue, categoryValue, disabledSave, isErr } = this.state
    const { handleNameChange, handlePriceChange, handleStockChange, handleCategoryChange, handleSubmit } = this

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Add a Product</div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            {
              isErr ? <div className="alert alert-danger">Name should be Unique</div> : null
            }
            <div className="form-group">
              <label>Name</label>
              <input onChange={handleNameChange} name="name" className="form-control" value={nameValue} />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input onChange={handlePriceChange} type="number" name="price" className="form-control" value={priceValue} />
            </div>
            <div className="form-group">
              <label>inStock</label>
              <br></br>
              <input type="checkbox" onChange={handleStockChange} name="inStock" value={stockValue ? "on" : "off"} checked={stockValue} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="categoryId" onChange={handleCategoryChange} value={categoryValue} className="form-control">
                <option value=''>--none--</option>
                {
                  categories.map(function (category) {
                    return (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <button disabled={disabledSave} className="btn btn-primary btn-block">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ProductForm
