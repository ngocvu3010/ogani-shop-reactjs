import productImage from '../../img/latest-product/lp-1.jpg';
import React from 'react';
import {useHistory} from 'react-router-dom'

function ProductList({products}){
  const history = useHistory();

  return products.map((product, index) => {
      const image = product.img && product.img[0];
      return(
        <a href="#" className="latest-product__item"
          key={index}
          onClick={() => history.push(`product/${product.id}`)}
        >
          <div className="latest-product__item__pic">
            <img src={image} alt="" />
          </div>
          <div className="latest-product__item__text">
            <h6>{product.name}</h6>
            <span>${product.newPrice}</span>
          </div>
        </a>
      )
    }
  )
 }

export default ProductList;
