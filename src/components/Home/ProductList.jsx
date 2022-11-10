import productImage from '../../img/latest-product/lp-1.jpg';

function ProductList({products}){
  console.log(products)
  return products.map((product, index) => {
      const image = product.img && product.img[0];
      return(
        <a href="#" className="latest-product__item" key={index}>
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
