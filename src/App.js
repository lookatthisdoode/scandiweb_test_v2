import React from 'react';
import Home from './containers/Home/Home';
import AddProduct from './containers/AddProduct/AddProduct';
import './App.css';

const apiurl = 'http://localhost/request.php'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      test: 'check1',
      route: 'home',
      products: []
    }
  }


  onRouteChange = (route) => {
    this.setState({route})
  }

  

  getProducts = () => {
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

  deleteByIds()  {
    let divcount = document.getElementById('containerProduct').children.length;
    let arraywhattodelete = [];

    for (let i=1; i<divcount+1; i++){
        if (document.getElementById('checkbox'+i).checked === true) {
            arraywhattodelete.push(i);
        }
    }
    //use map here 
    //documentGet all of them and map through it

    fetch(apiurl, {
      method: 'POST',
      body: JSON.stringify(arraywhattodelete)
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });

}


  componentDidMount() {
    this.getProducts()
  }

  //delete products from db

  //addproduct to db : it will collect all the values but omit empty ones and render will do the same
  //checksku : check if sku exist or what (for a formhandler)
  //arrangeids : needed for my checkbox checkers


  
  //maybe just 1 rest api to quiery post get delete and update
  //that api can have this product classes so when api recieves values it will create a new Dvd, for example, and use this DVD to DB method to store
  //that api can be like one big request instead of 5 requests
  // like if method get and if its var = arrangeid (localhost?vararrangeid) so run arrangeid etc
  // i kinda have a lot of this written but just have to move it around
  

  render() {
    const { route, products} = this.state 
    return (
      <div className="App">
        { route === 'home'
        ? <Home products={products} 
            onRouteChange={this.onRouteChange} 
            getProducts={this.getProducts}
            deleteByIds={this.deleteByIds}
          />
        : <AddProduct onRouteChange={this.onRouteChange}/>
        }

      </div>
    )
  }
}

export default App;
