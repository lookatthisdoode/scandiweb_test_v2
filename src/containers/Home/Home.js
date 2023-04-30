import React from 'react';
import './Home.css'
import NavigationHome from '../../components/NavigationHome/NavigationHome';
import ProductCard from '../../components/ProductCard/ProductCard';

const apiurl = 'http://localhost/request.php'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      redirect: false,
    }
  }

  getProducts() {
    //const url = `/request.php`; //real url
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

  
  deleteByIds(){
    //get qty of checkboxes
    let divcount = document.getElementById('containerProduct').children.length;
    //create array for ids
    let deleteIds = [];
    //populate array with only checked ids
    for (let i=1; i<divcount+1; i++){
      if (document.getElementById('checkbox' + i).checked === true) {
          deleteIds.push(i);
      }
    }
    //request API to delete 
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
    //reloads the page to get new array of products from DB
    window.location.reload(false); //worked like a charm
  }


  render() {
    //gets array of products
    this.getProducts()
    return (
      <div className="home">
        <NavigationHome  
          deleteByIds={() => this.deleteByIds()}/>
        <div className="divider-home"></div>
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
