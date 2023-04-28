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
      <button onClick={() => this.props.deleteByIds()}>deleteshit</button> 
        <NavigationHome 
          onRouteChange={this.props.onRouteChange} 
          deleteByIds={this.props.deleteByIds}/>
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
