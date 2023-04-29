import React from 'react';
import NavigationAdd from '../../components/NavigationAdd/NavigationAdd';
import './AddProduct.css';

class AddProduct extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentType: 'Furniture',
      forms: {
        DVD:
        <div>
          Size:
            <input type='number' name='size' id='size' placeholder='mb' onfocus='blockEDash(this.id)'></input>
            <input type='hidden' name='product_type' id='product_type' value='DVD'></input>
        </div>,
        Furniture:
        <div>
          Width: 
            <input type='number' name='width' id='width' placeholder='cm' onfocus='blockEDash(this.id)'></input>
          Length: 
            <input type='number' name='length' id='length' placeholder='cm' onfocus='blockEDash(this.id)'></input>
          Height:
            <input type='number' name='height' id='height' placeholder='cm' onfocus='blockEDash(this.id)'></input>
            <input type='hidden' name='product_type' id='product_type' value='Furniture'></input>
        </div>,
        Book:
        <div>
          Weight:
            <input type='number' name='weight' id='weight' placeholder='kg' onfocus='blockEDash(this.id)'></input>
            <input type='hidden' name='product_type' id='product_type' value='Book'></input>
        </div>
      }
    }
  }

  render() {
    const currentType = this.state.currentType //does not work
    return (
      <div className="addproduct">
        <NavigationAdd />
        <div className="divider-add"></div>
        <div className="formBody">
          <div id="error"></div>

          <form 
          id="product_form"
          action="index.php" 
          method="post">
            SKU:<input type="text" name="sku" id="sku"></input>
            Name:<input type="text" name="name" id="name"></input>
            Price:<input type="number" name="price" id="price" onfocus="blockEDash(this.id)"></input>

            <p>Select type of product:</p>

            <select id="productType" onchange="changeform(this.value)">
                <option value="">Choose Type</option>
                <option value="Book">Book</option>
                <option value="DVD">DVD</option>
                <option value="Furniture">Furniture</option>
            </select>

            <div id="bottomform">
              {this.state.forms.DVD}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddProduct;
