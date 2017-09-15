import React, { Component } from 'react'
import axios from 'axios'


class ProductList extends Component {
  constructor(){
    super()
    this.state = {
      currentProducts: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleStockChange = this.handleStockChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps(){
    axios.get('/api/products')
    .then(res => res.data)
    .then( products => {
      products.forEach( product => {
        product.disabledSave = true
      })
      this.setState({currentProducts: products})
    })
  }

  componentDidMount() {
    axios.get('/api/products')
    .then(res => res.data)
    .then( products => {
      products.forEach( product => {
        product.disabledSave = true
      })
      this.setState({currentProducts: products})
    })
  }

  handleNameChange(e, id) {
    const updateProducts = this.state.currentProducts
    for (var i = 0; i < updateProducts.length; i++) {
      if (updateProducts[i].id === id) {
        updateProducts[i].name = e.target.value
        updateProducts[i].disabledSave = false
        break
      }
    }
    this.setState({currentProducts: updateProducts})
  }

  handlePriceChange(e, id) {
    const updateProducts = this.state.currentProducts
    for (var i = 0; i < updateProducts.length; i++) {
      if (updateProducts[i].id === id) {
        updateProducts[i].price = e.target.value
        updateProducts[i].disabledSave = false
        break
      }
    }
    this.setState({currentProducts: updateProducts})
  }

  handleCategoryChange(e, id) {
    const updateProducts = this.state.currentProducts
    const updateCategory = this.props.categories.filter(function(category){
      return category.id === e.target.value * 1
    })[0]
    for (var i = 0; i < updateProducts.length; i++) {
      if (updateProducts[i].id === id) {
        updateProducts[i].category = updateCategory
        updateProducts[i].disabledSave = false
        break
      }
    }
    this.setState({currentProducts: updateProducts})
  }

  handleStockChange(e, id) {
    const updateProducts = this.state.currentProducts
    for (var i = 0; i < updateProducts.length; i++) {
      if (updateProducts[i].id === id) {
        updateProducts[i].inStock = !updateProducts[i].inStock
        updateProducts[i].disabledSave = false
        break
      }
    }
    this.setState({currentProducts: updateProducts})
  }

  handleSubmit(e, id){
    e.preventDefault()
    const requestBody = {
      name: e.target.name.value,
      price: e.target.price.value,
      inStock: e.target.inStock.value === 'on',
      categoryId: e.target.categoryId.value
    }
    this.props.updateProduct(id, requestBody)
  }

  handleDelete(e, id) {
    e.preventDefault()
    this.props.removeProduct(id)
  }

  render(){
    const { categories } = this.props
    const { handleNameChange, handlePriceChange, handleStockChange, handleCategoryChange, handleSubmit, handleDelete } = this
    const { currentProducts } = this.state
    return (
      <div>
        {
          currentProducts.map(function(product){
            return (
              <div key={product.id} className="col-sm-4">
                <div className="panel panel-default">
                  <div className="panel panel-body">
                    <form onSubmit={ (e) => { handleSubmit(e, product.id) }}>
                      <div className="form-group">
                        <label>Name</label>
                        <input onChange={ (e) => {handleNameChange(e, product.id)} }name="name" className="form-control" value={product.name} />
                      </div>
                      <div className="form-group">
                        <label>Price</label>
                        <input onChange={ (e) => {handlePriceChange(e, product.id)}} type="number" name="price" className="form-control" value={product.price} />
                      </div>
                      <div className="form-group">
                        <label>inStock</label>
                        <br></br>
                        <input type="checkbox" onChange={(e) => {handleStockChange(e, product.id)}} name="inStock" value={product.inStock ? "on" : "off"} checked={product.inStock} />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select name="categoryId" onChange={(e) => {handleCategoryChange(e, product.id)}} value={product.category ? product.category.id : ''}>
                          <option value=''>--none--</option>
                          {
                            categories.map(function(category){
                              return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="form-group">
                        <button type="submit" disabled={product.disabledSave} className="btn btn-primary btn-block">Save</button>
                        <button type="button" onClick={(e)=>{handleDelete(e, product.id)}} className="btn btn-danger btn-block">Delete</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ProductList
