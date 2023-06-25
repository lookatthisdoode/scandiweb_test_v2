import React from 'react';
import { Navigate } from "react-router-dom";
import NavigationAdd from '../../components/NavigationAdd/NavigationAdd';
import './AddProduct.css';

class AddProduct extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentType: '',
      redirect: false,
      forms: {
        DVD:
        <div>
          Size:
            <input type='number' name='size' id='size' placeholder='mb' onFocus={(e) => this.blockEDash(e.target.id)}></input>
            <input type='hidden' name='product_type' id='product_type' value='DVD'></input>
        </div>,
        Furniture:
        <div>
          Width: 
            <input type='number' name='width' id='width' placeholder='cm' onFocus={(e) => this.blockEDash(e.target.id)}></input>
          Length: 
            <input type='number' name='length' id='length' placeholder='cm' onFocus={(e) => this.blockEDash(e.target.id)}></input>
          Height:
            <input type='number' name='height' id='height' placeholder='cm' onFocus={(e) => this.blockEDash(e.target.id)}></input>
            <input type='hidden' name='product_type' id='product_type' value='Furniture'></input>
        </div>,
        Book:
        <div>
          Weight:
            <input type='number' name='weight' id='weight' placeholder='kg' onFocus={(e) => this.blockEDash(e.target.id)}></input>
            <input type='hidden' name='product_type' id='product_type' value='Book'></input>
        </div>
      }
    }
  }

  //checks if given sku already exist inside the DB
  checkSKU(sku){
    return fetch(this.props.apiUrl, {
      method: 'POST',
      mode:this.props.fetchMode,
      body: JSON.stringify(sku),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .catch(error=>console.log)
  }

  //replaces all weird characters in number field 
  blockEDash(id){
    var invalidChars = [
        "-", "+", "e",
    ]
    document.getElementById(id).addEventListener("keydown", function(e) {
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    })
    document.getElementById(id).addEventListener("input", function() {
        this.value = this.value.replace(/[e\+\-]/gi, "");
    })
  }

  //bottom form changer
  changeForm(value) {
    this.setState({currentType: value})
  }

  //basically v_1 formhandler, omits html form handling 
  async submitForm(e) {
    e.preventDefault();

    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    //defines all fields
    var sku = document.getElementById('sku')
    var name = document.getElementById('name')
    var price = document.getElementById('price')
    var weight = document.getElementById('weight')
    var dvd = document.getElementById('size')
    var width = document.getElementById('width')
    var length = document.getElementById('length')
    var height = document.getElementById('height')
    var type = document.getElementById('product_type')
    var errorMsg = document.getElementById('error')
    errorMsg.innerHTML = ""
    //should be a better way to get all the values from it

    try {
        if (sku.value === "")               throw "SKU field is required";
        if (sku.value.length < 5 )          throw "SKU should be longer than 5 symbols";
        if (sku.value.length > 10)          throw "SKU should be shorted than 10 symbols";
        if (format.test(sku.value))         throw "SKU must not contain any special characters";
        if (await this.checkSKU(sku.value) === 'exist')       throw "This SKU is already exist";
        if (name.value === "")               throw "Enter name";
        if (name.value.length < 3)          throw "Name must be longer that 3 digits";
        if (name.value.length > 15)         throw "Name must be shorter that 15 digits";
        if (format.test(name.value))        throw "Name must not contain any special characters";
        if (price.value === "")              throw "Enter price";
        if (price.value.length > 10)        throw "Price should be longer than 10 digits";
        if (!type)                          throw "You must choose the type of product";
        if (dvd) if (dvd.value === "")       throw "Size field is required";
        if (weight) if (weight.value === "") throw "Weight field is required";
        if (width) if (width.value === "")   throw "Width field is required";
        if (length) if (length.value === "") throw "Length field is required";
        if (height) if (height.value === "") throw "Height field is required";

        // creates objects that gets passed to db
        const formValues = {
          sku: sku.value,
          name: name.value,
          price: price.value,
          weight: weight ? weight.value : null,
          size: dvd ? dvd.value : null,
          width: width ? width.value : null,
          length: length ? length.value : null,
          height: height ? height.value : null,
          product_type: type.value,
        };
        
        //main submit fetch
        fetch(this.props.apiUrl, {
          method: 'POST',
          body: JSON.stringify(formValues),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => console.log)
        .catch(error => {
          console.error(`Cant add product to db. Error: ${error}`);
        });
        this.setState({ redirect: true })

        } catch (e) {
            errorMsg.innerHTML = e;
        }
}

  render() {
    if(this.state.redirect) {
    return <Navigate to="/"/>
    }

    return (
      <div className="addproduct">
        <NavigationAdd 
          submitForm={(e) =>this.submitForm(e)}/>
        <div className="divider-add"></div>
        <div className="formBody">
          <div id="error"></div>

          <form 
          id="product_form"
          action="index.php" 
          method="post">
            SKU:<input type="text" name="sku" id="sku"></input>
            Name:<input type="text" name="name" id="name"></input>
            Price:<input type="number" name="price" id="price" onFocus={(e) => this.blockEDash(e.target.id)}></input>

            <p>Select type of product:</p>

            <select id="productType" onChange={(event) => this.changeForm(event.target.value)}>
                <option value="">Choose Type</option>
                <option value="Book">Book</option>
                <option value="DVD">DVD</option>
                <option value="Furniture">Furniture</option>
            </select>

            <div id="bottomform">
              {this.state.forms[this.state.currentType]}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddProduct;
