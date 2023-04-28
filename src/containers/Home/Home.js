import React from 'react';
import './Home.css'
import ProductCard from '../../components/ProductCard/ProductCard';
import NavigationHome from '../../components/NavigationHome/NavigationHome';


class Home extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="home">
        <NavigationHome onRouteChange={this.props.onRouteChange}/>
        <button onClick={this.props.getProducts}>server</button>
        <button onClick={this.props.deleteByIds}>delete</button>
        <div className="divider"></div>
        <div id="containerProduct" className="container_products">
          {
            this.props.products.map((product, key) => {
              return <ProductCard product={product} key={key}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default Home;
