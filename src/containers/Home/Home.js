import React from 'react';
import './Home.css'
import NavigationHome from '../../components/NavigationHome/NavigationHome';
import ProductCard from '../../components/ProductCard/ProductCard';


class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      products: [],
      redirect: false,
    }
  }


  getProducts() {
    fetch(this.props.apiUrl, {
      method: "GET",
      mode: this.props.fetchMode,
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
    console.log(deleteIds)
    //request API to delete 
    fetch(this.props.apiUrl, {
    method: 'POST',
    mode: this.props.fetchMode,
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
    console.error(error)
    })
    .finally(() => {
      window.location.reload(false)
    })
  }

  //jsut gets all products upon first rendering
  componentDidMount() { 
    this.getProducts()
  }

  render() {
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
