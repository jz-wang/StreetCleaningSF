import React from 'react';

class Address extends React.Component {
  constructor(props){
    super(props);
    this.addresses = [];
    this.state = {
      showAddressInput: false,
      showAddressInputLink: true,
      inputAddress: ""
    };

    this.showAddressInput = this.showAddressInput.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
    this.setupChromeSync = this.setupChromeSync.bind(this);
    this.setAddresses = this.setAddresses.bind(this);
  }

  componentDidMount(){
    this.props.getChromeSync();
  }

  componentDidUpdate(){
    this.setupChromeSync();
    this.setAddresses();
  }

  setupChromeSync(){
    if(this.props.addresses === undefined){
      this.props.setChromeSync([]);
    }
  }

  setAddresses(){
    this.addresses = this.props.addresses;
  }

  submitAddress(e){
    e.preventDefault();
    this.addresses.push(this.state.inputAddress);
    this.props.setChromeSync(this.addresses);
    this.setState({showAddressInput: false,
                   showAddressInputLink: true,
                   inputAddress: ""});
  }

  showAddressInput(){
    this.setState({ showAddressInput: true,
                    showAddressInputLink: false });
  }

  update(field){
    return e => { this.setState({[field]: e.currentTarget.value }); };
  }

  addressInput(){
    if(this.state.showAddressInput === true){
      return (
        <form onSubmit={this.submitAddress}>
          <input type='text'
                 placeholder='Input address here'
                 value={this.state.inputAddress}
                 onChange={this.update('inputAddress')} />

          <input type='submit' value='Add'/>
        </form>
      );
    }
  }

  addressesInputLink(){
    if(this.state.showAddressInputLink === true){
      return (
        <div onClick={this.showAddressInput}>
          Input addresses
        </div>
      );
    }
  }

  renderAddresses(addresses){
    if(addresses.length === 0 || addresses.length === undefined){
      return (
        <div>No addresses found!</div>
      );
    } else {
      let addressArr = addresses.map((address, i)=>{
        return(
          <li type='disc' key={`address${i}`}>
            {address}
          </li>
        );
      });

      return(
        <ul>{addressArr}</ul>
      );
    }
  }

  render(){
    if(this.props.addresses === undefined){
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div>
          <div>
            {this.renderAddresses(this.props.addresses)}
            {this.addressesInputLink()}
            {this.addressInput()}
          </div>
        </div>
      );
    }
  }
}

export default Address;