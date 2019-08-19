import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should calculate result on button click', () => {
  
  const wrapper = shallow(<App />);
  wrapper.setState({
    accountCurrency: "USD",
    baseCurrency: "EUR",
    quoteCurrency: "CNY",
    action: "Buy",
    currentPrice: "1",
    tradePrice: "2",
    numberOfUnits: "1000",
    closingPrice: "3",
    profit: "",
    validated: false
  });
  wrapper.find('#calculate-result-btn').simulate('click');
  expect(wrapper.state().profit).toEqual("1000.00");  //(3-1)*1*1000
})

it('check result with some initiate data', () => {
  
  const wrapper = shallow(<App />);
  wrapper.setState({
    accountCurrency: "USD",
    baseCurrency: "EUR",
    quoteCurrency: "CNY",
    action: "Buy",
    currentPrice: "0.14",
    tradePrice: "7.8",
    numberOfUnits: "500",
    closingPrice: "8",
    profit: "",
    validated: false
  });
  wrapper.find('#calculate-result-btn').simulate('click');
  expect(wrapper.state().profit).toEqual("14.00");  //(8-7.8)*0.14*500
})

it('check result with the Sell action', () => {
  
  const wrapper = shallow(<App />);
  wrapper.setState({
    accountCurrency: "USD",
    baseCurrency: "EUR",
    quoteCurrency: "CNY",
    action: "Sell",
    currentPrice: "0.14",
    tradePrice: "7.8",
    numberOfUnits: "500",
    closingPrice: "8",
    profit: "",
    validated: false
  });
  wrapper.find('#calculate-result-btn').simulate('click');
  expect(wrapper.state().profit).toEqual("-14.00");  //-(8-7.8)*0.14*500
})

it('should return 0 with 0 initiate data', () => {
  
  const wrapper = shallow(<App />);
  wrapper.setState({
    accountCurrency: "USD",
    baseCurrency: "EUR",
    quoteCurrency: "CNY",
    action: "Buy",
    currentPrice: "0",
    tradePrice: "0",
    numberOfUnits: "0",
    closingPrice: "0",
    profit: "",
    validated: false
  });
  wrapper.find('#calculate-result-btn').simulate('click');
  expect(wrapper.state().profit).toEqual("0.00");
})