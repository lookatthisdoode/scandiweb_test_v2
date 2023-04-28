import React from 'react';
import Home from './containers/Home/Home';
import AddProduct from './containers/AddProduct/AddProduct';
import './App.css';

const apiurl = 'http://localhost/request.php'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'home',
      products: []
    }
  }


  onRouteChange = (route) => {
    this.setState({route})
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

  
  deleteByIds()  {
    console.log(this.state) //почему сука я не могу
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
    console.log(this.state.route)
  }


  //addproduct to db : it will collect all the values but omit empty ones and render will do the same
  //checksku : check if sku exist or what (for a formhandler)


  
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
