import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap'

const CURRENCIES = ["", "AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR",
"GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR",
"NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD", "ZAR"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountCurrency: "",
      baseCurrency: "",
      quoteCurrency: "",
      action: "Buy",
      currentPrice: "",
      tradePrice: "",
      numberOfUnits: "",
      closingPrice: "",
      profit: "",
      validated: false
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {accountCurrency, baseCurrency, quoteCurrency} = this.state;
    switch (e.target.id) {
      case "AccountCurrency": {
        if (quoteCurrency) {
          this.getRate(quoteCurrency, e.target.value)
          .then((rate)=>{
            this.setState({
              currentPrice: rate
            })
          }) 
        }
        this.setState({
          accountCurrency: e.target.value,
          profit: ""
        });
        break;
      }
      case "BaseCurrency": {
        if (quoteCurrency) {
          this.getRate(e.target.value, quoteCurrency)
          .then((rate)=>{
            this.setState({
              tradePrice: rate
            })
          }) 
        }
        this.setState({
          baseCurrency: e.target.value,
          profit: ""
        });
        break;
      }
      case "QuoteCurrency": {
        if (accountCurrency) {
          this.getRate(e.target.value, accountCurrency)
          .then((rate)=>{
            this.setState({
              currentPrice: rate
            })
          }) 
        }
        if (baseCurrency) {
          this.getRate(baseCurrency, e.target.value)
          .then((rate)=>{
            this.setState({
              tradePrice: rate
            })
          }) 
        }
        this.setState({
          quoteCurrency: e.target.value,
          profit: ""
        });
        break;
      }
      case "Action": {
        this.setState({
          action: e.target.value,
          profit: ""
        });
        break;
      }
      case "ClosingPrice": {
        const value = e.target.value;
        const reg = new RegExp(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
        if (value === '' || reg.test(value)) {
          this.setState({
            closingPrice: e.target.value,
            profit: ""
          });
        }
        break;
      }
      case "NumberOfUnits": {
        const value = e.target.value;
        const reg = new RegExp(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
        if (value === '' || reg.test(value)) {
          this.setState({
            numberOfUnits: e.target.value,
            profit: ""
          });
        }
        break;
      }
      default:
        console.log("Unhandled event");
    }
  }

  onClick() {
    if (this.isFormValid()) {
      const {action, currentPrice, tradePrice, numberOfUnits, closingPrice} = this.state;
      let profit = (closingPrice - tradePrice) * currentPrice * numberOfUnits;
      if (action === "Sell") profit = profit * -1;
      profit = profit.toFixed(2);
      this.setState({
        validated: false,
        profit
      });
    } else {
      this.setState({
        validated: true
      });
    }
  }

  getRate(base, quote) {
    let promise = fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${quote}`)
    .then((resp) => resp.json())
    .then((data) => data.rates[quote])
    .catch(e=>{console.log(e)});
    return promise;
  }

  getCurrenciesAsOptions()  {
    let i = 0;
    return CURRENCIES.map(item=><option key = {i++}>{item}</option>);
  }

  isFormValid() {
    const {accountCurrency, baseCurrency, quoteCurrency, currentPrice, tradePrice, numberOfUnits, closingPrice} = this.state;
    return (
      accountCurrency
      && baseCurrency
      && quoteCurrency
      && currentPrice
      && tradePrice
      && numberOfUnits
      && closingPrice
      ) ? true : false;
  }

  render() {
    console.log(this.state)
    const currencies = this.getCurrenciesAsOptions();
    const {accountCurrency, baseCurrency, quoteCurrency, currentPrice, tradePrice, numberOfUnits, closingPrice, profit, validated} = this.state;
    const profitValue = (profit ? `${profit} ${accountCurrency}` : "");
    const currentPriceValue = (currentPrice ? `${currentPrice} ${quoteCurrency}/${accountCurrency}` : "");
    const tradePriceValue = (tradePrice ? `${tradePrice} ${baseCurrency}/${quoteCurrency}` : "");

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
        <Form noValidate validated={validated}>
          <Form.Group as={Row} controlId="AccountCurrency">
            <Form.Label column sm={5}>
              Account currency
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                onChange={this.handleChange}
                required
              >
                {currencies}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="BaseCurrency">
            <Form.Label column sm={5}>
              Base Currency
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                onChange={this.handleChange}
                required
              >
                {currencies}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="QuoteCurrency">
            <Form.Label column sm={5}>
              Quote Currency
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                onChange={this.handleChange}
                required  
              >
                {currencies}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="CurrenctPrice">
            <Form.Label column sm={5}>
              Current price
            </Form.Label>
            <Col sm={7}>
              <Form.Control plaintext readOnly value={currentPriceValue} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="TradePrice">
            <Form.Label column sm={5}>
              TradePrice
            </Form.Label>
            <Col sm={7}>
              <Form.Control plaintext readOnly value={tradePriceValue} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="Action">
            <Form.Label column sm={5}>
              Action
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
              as="select"
              onChange={this.handleChange}>
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
              <Form.Control
              value = {closingPrice}
              onChange={this.handleChange}
              required
              />
            </Col>
          </Form.Group>
          

          <Form.Group as={Row} controlId="NumberOfUnits" >
            <Form.Label column sm={5}>
              Number of units
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                value = {numberOfUnits}
                onChange={this.handleChange}
                required
              />
            </Col>
          </Form.Group>
          
          <Form.Group>
              <Button
              type="button"
              onClick={this.onClick}
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
              <Form.Control plaintext readOnly value={profitValue} />
            </Col>
          </Form.Group>
        </Form> 
      </div>
    );
  }
}

export default App;
