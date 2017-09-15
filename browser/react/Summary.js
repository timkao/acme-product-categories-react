import React, { Component } from 'react'

class Summary extends Component {

  render() {
    const { products, categories } = this.props
    const highestPrice = products.reduce(function (start, product) {
      if (Number(product.price) > start) {
        return product.price * 1
      }
      else {
        return start
      }
    }, 0)

    const pricyProducts = products.filter(function (product) {
      return Number(product.price) === highestPrice
    })

    const noStocks = products.filter(function(product) {
      return !product.inStock
    })

    const noCategory = products.filter(function(product) {
      return !product.category
    })

    return (
      <div className="panel panel-default">
        <div className="panel panel-heading">Product Summary</div>
        <div className="panle panel-body">
          <ul className="list-group">
            <li className="list-group-item">There are <strong>{products.length}</strong> products</li>
            <li className="list-group-item">Categories:
              <ul>
                {
                  categories.map(function (category) {
                    return (
                      <li key={category.id}>{category.name} has {category.products.length} Products</li>
                    )
                  })
                }
                <li> <strong>{noCategory.length}</strong> products has no category</li>
              </ul>
            </li>
            <li className="list-group-item">Most expensive product(s) with price <strong>${highestPrice}</strong>:
              <ul>
                {
                  pricyProducts.map(function (pricyProduct) {
                    return (
                      <li key={pricyProduct.id}>{pricyProduct.name}</li>
                    )
                  })
                }
              </ul>
            </li>
            <li className="list-group-item">Out of Stock:
              <ul>
                {
                  noStocks.map(function (stockOutProduct) {
                    return (
                      <li key={stockOutProduct.id}>{stockOutProduct.name}</li>
                    )
                  })
                }
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Summary
