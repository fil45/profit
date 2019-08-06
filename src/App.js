import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap'

const CURRENCIES = ["USD", "EUR", "CNY"];
const PAIRS = ["USD/EUR", "USD/CNY", "EUR/CNY"];

class App extends React.Component {
  state = {
    selectedOption: null,
  };

  handleChange(e) {
    console.log(e.target.value);
  }

  getCurrenciesAsOptions()  {
    return CURRENCIES.map(item=><option>{item}</option>);
  }

  getPairsAsOptions()  {
    return PAIRS.map(item=><option>{item}</option>);
  }

  render() {
    let currencies = this.getCurrenciesAsOptions();
    let pairs = this.getPairsAsOptions();
    let middlePair = "USD/EUR" //TODO
    let selectedCurrencyPair = "USD/EUR" //TODO
    let currentPrice = 1.15; //TODO
    let tradePrice = 0.16;  //TODO
    let selectedAccountCurrency = "USD";  //TODO
    let profit = 15.16;  //TODO

    return (
      <div
      style={{width:"400px",
              display:"block",
              margin:"auto",
              marginTop:"50px"}}
      >
        <h3 style={{textAlign:"center",
        margin:"20px"
        }}
        >Profit calculator</h3>
        <Form>
          <Form.Group as={Row} controlId="AccountCurrency">
            <Form.Label column sm={5}>
              Account currency
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
              as="select"
              onChange={this.handleChange.bind(this)}>
                {currencies}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="CurrencyPair">
            <Form.Label column sm={5}>
              Currency pair
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
              as="select"
              onChange={this.handleChange.bind(this)}>
                {pairs}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="CurrenctPrice">
            <Form.Label column sm={5}>
              Current price
            </Form.Label>
            <Col sm={7}>
              <Form.Control plaintext readOnly defaultValue={currentPrice + " " + middlePair} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="TradePrice">
            <Form.Label column sm={5}>
              TradePrice
            </Form.Label>
            <Col sm={7}>
              <Form.Control plaintext readOnly defaultValue={tradePrice + " " + selectedCurrencyPair} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="Action">
            <Form.Label column sm={5}>
              Action
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
              as="select"
              onChange={this.handleChange.bind(this)}>
                <option>Buy</option>
                <option>Sell</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="ClosingPrice">
            <Form.Label column sm={5}>
              Closing price
            </Form.Label>
            <Col sm={7}>
              <Form.Control/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="NumberOfUnits">
            <Form.Label column sm={5}>
              Number of units
            </Form.Label>
            <Col sm={7}>
              <Form.Control/>
            </Col>
          </Form.Group>

          <Form.Group>
              <Button
              type="button"
              style={{
              display:"block",
              margin:"auto"}}
              >Calculate</Button>
          </Form.Group>

          <Form.Group as={Row} controlId="Profit">
            <Form.Label column sm={5}>
              Profit 
            </Form.Label>
            <Col sm={7}>
              <Form.Control plaintext readOnly defaultValue={profit + " " + selectedAccountCurrency} />
            </Col>
          </Form.Group>
        </Form> 
      </div>
    );
  }
}



export default App;
