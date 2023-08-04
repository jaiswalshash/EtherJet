import React, { useState, useEffect } from 'react';
import './searchBar.css';
import { Select, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
const { RangePicker } = DatePicker;

const SearchBar = () => {
  const cityOptions = useSelector((state) => state.data.cities);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const isOptionDisabled = (option) => option.label === 'Delhi';

  return (
    <>
      <Select
        showSearch
        style={{
          width: "100%",
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={cityOptions.map((option) => ({
          ...option,
          disabled: isOptionDisabled(option),
        }))}
        value={selectedCity}
        onChange={handleCityChange}
      />

    <Select
        showSearch
        style={{
          width: "100%",
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={cityOptions.map((option) => ({
          ...option,
          disabled: isOptionDisabled(option),
        }))}
        value={selectedCity}
        onChange={handleCityChange}
      />
      <RangePicker
        style={{
          width: "100%",
        }}
      />
      <button className='search-button'>Search</button>
    </>
  );
};

export default SearchBar;
