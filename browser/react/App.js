import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ProductList from './ProductList'
import axios from 'axios'
import ProductForm from './ProductForm'
import Summary from './Summary'

class App extends Component {
  constructor(){
    super()
    this.state = {
      products: [],
      categories: []
    }
    this.removeProduct = this.removeProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
    this.createProduct = this.createProduct.bind(this)
  }

  componentDidMount() {
    Promise.all([
      axios.get('/api/products'),
      axios.get('/api/categories')
    ])
    .then(([productsResult, categoriesResult]) => {
      this.setState({
        products: productsResult.data,
        categories: categoriesResult.data
      })
    })
  }

  removeProduct(id){
    axios.delete(`/api/products/${id}`)
    .then( result => {
      return Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories')
      ])
    })
    .then(([productsResult, categoriesResult]) => {
      this.setState({
        products: productsResult.data,
        categories: categoriesResult.data
      })
    })
  }

  updateProduct(id, reqObj) {
    axios.put(`/api/products/${id}`, reqObj)
    .then( result => {
      return Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories')
      ])
    })
    .then(([productsResult, categoriesResult]) => {
      this.setState({
        products: productsResult.data,
        categories: categoriesResult.data
      })
    })
  }

  createProduct(reqObj) {
    return axios.post('/api/products', reqObj)
    .then( result => {
      return Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories')
      ])
    })
    .then(([productsResult, categoriesResult]) => {
      this.setState({
        products: productsResult.data,
        categories: categoriesResult.data
      })
    })
  }

  render(){
    const { categories, products } = this.state
    const { removeProduct, updateProduct, createProduct } = this

    return (
      <div className="container">
        <h1>Acme Product/Categories React</h1>
        <div className="row">
          <div className="col-sm-6">
            <ProductList removeProduct={removeProduct} updateProduct={updateProduct} categories={categories} />
          </div>
          <div className="col-sm-3">
            <ProductForm createProduct={createProduct} categories={categories} />
          </div>
          <div className="col-sm-3">
            <Summary products={products} categories={categories} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
