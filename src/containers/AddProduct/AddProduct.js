import React from 'react';

class AddProduct extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="add-product">
        <h1>hai zyabls eto stranica gde dobavlyat predmety</h1>
        <button onClick={() => this.props.onRouteChange('home')}>nazad</button>
      </div>
    )
  }
}

export default AddProduct;
