import React from 'react';
import './Home.css'
import ProductCard from '../../components/ProductCard/ProductCard';
import NavigationHome from '../../components/NavigationHome/NavigationHome';

const apiurl = 'http://localhost/request.php'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
  }

  
  getProducts() {
    //const url = `/request.php`; 
    fetch(apiurl, {
      method: "GET",
      mode: "cors", //change to same origin before deploy
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ products: data })
    })
    .catch(error => console.error(error));
  }

  
  deleteByIds(message)  {
    console.log(message)
    console.log(this.state) //почему сука я не могу // а неь миогу
    let divcount = document.getElementById('containerProduct').children.length;
    let deleteIds = [];
    for (let i=1; i<divcount+1; i++){
      if (document.getElementById('checkbox' + i).checked === true) {
          deleteIds.push(i);
      }
    }

    fetch(apiurl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deleteIds)
    })
    .then(data => data.json())
    .then(responce => {
      console.log(responce)
      })
    .catch(error => {
    console.error(error);
    })
  }

  componentDidMount() {
    this.getProducts()
  }

  render() {
    return (
      <div className="home">
      <button onClick={() => this.deleteByIds()}>deleteshit</button> 
        <NavigationHome  
          deleteByIds={this.deleteByIds}/>
        <div className="divider"></div>
        <div id="containerProduct" className="container_products">
          {
            this.state.products.map((product, key) => {
              return <ProductCard product={product} key={key}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default Home;
