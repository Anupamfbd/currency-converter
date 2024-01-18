
import React, { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';

const CurrencyConverter = () => {
  const [sourceValue, setSourceValue] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('INR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [conversionRate, setConversionRate] = useState(0);
  const [targetValue, setTargetValue] = useState('');
  const [optionText, setoptionText] = useState('Indian Rupee');
  const [optionText2, setoptionText2] = useState('United State Dollar');

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your Currency Layer API key
        const response = await axios.get(
          `https://open.er-api.com/v6/latest/${sourceCurrency}?apikey=${apiKey}`
        );
        const rate = response.data.quotes[`USD${targetCurrency}`];
        setConversionRate(rate);
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
      }
    };

    fetchConversionRate();
  }, [targetCurrency]);

  const handleConvert = () => {
    if (conversionRate) {
      const result = (parseFloat(sourceValue) * conversionRate).toFixed(2);
      setTargetValue(result);
    }
  };


  //date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    const options = {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short',
    };

    return date.toLocaleDateString('en-US', options);
  };

  const formattedDateTime = formatDateTime(currentDateTime);

  return (
    <div className='main'>
        <p>{sourceValue} {optionText} equals </p><br/>
        <p>{targetValue} {optionText2} </p>
        <div className='date'>
          {formattedDateTime} &middot; Disclaimer
        </div>
        
      <div className='inputdiv1'>
          <input
            type="number"
            className='input1'
            min="0"
            value={sourceValue}
            onChange={(e) => {
              handleConvert();
              if(e.target.value>=0){
              setSourceValue(e.target.value)
            }}}
          />
          <select
            className='select1'
            value={sourceCurrency}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              setoptionText(selectedOption.textContent);
              setSourceCurrency(e.target.value)}}
          >
            <option value="INR">Indian Rupee</option>
            <option value="USD">United State Dollar</option>
            <option value="AED">United Arab Emirates Dirham</option>
            <option value="GBP">Pound sterling</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="EUR">Euro </option>
            <option value="JPY">Japanese Yen</option>
            <option value="PKR">Pakistani Rupee</option>
            <option value="ZAR">South African Rand</option>
            {/* <option value="ALL">ALL</option> */}
          </select>
      </div>
      <div className='inputdiv2'>
          <input
            type="number"
            className='input2'
            value={targetValue}
            readOnly
          />
          <select
          className='select2'
            value={targetCurrency}
            onChange={(e) => {
              const selectedOption2 = e.target.options[e.target.selectedIndex];
              setoptionText2(selectedOption2.textContent);
              setTargetCurrency(e.target.value)}}
          >
            <option value="INR">Indian Rupee</option>
            <option value="USD">United State Dollar</option>
            <option value="AED">United Arab Emirates Dirham</option>
            <option value="GBP">Pound sterling</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="EUR">Euro </option>
            <option value="JPY">Japanese Yen</option>
            <option value="PKR">Pakistani Rupee</option>
            <option value="ZAR">South African Rand</option>
            {/* <option value="ALL">ALL</option> */}
          </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;

