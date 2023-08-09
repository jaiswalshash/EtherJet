import React, { useState, useEffect } from 'react';
import './searchBar.css';
import { Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
const { RangePicker } = DatePicker;

const SearchBar = ({ start, end }) => {
  const cityOptions = useSelector((state) => state.data.cities);
  const [from, setFrom] = useState(useSelector((state) => state.tour.from));
  const [to, setTo] = useState(useSelector((state) => state.tour.to));

  const handleToChange = (value) => {
    setTo(value);
    start(value);
  };

  const handleFromChange = (value) => {
    setFrom(value);
    end(value);
  };

  const isToDisabled = (option) => option.label === from;
  const isFromDisabled = (option) => option.label === to;
  const dateFormat = 'DD-MM-YYYY';

  const today = dayjs().format(dateFormat); // Get today's date in the specified format

  // Get the date after today for disabling past days
  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <>
      <Select
        className='select-antd'
        showSearch
        placeholder="From"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={cityOptions.map((option) => ({
          ...option,
          disabled: isFromDisabled(option),
        }))}
        value={from}
        onChange={handleFromChange}
      />

      <Select
        className='select-antd'
        showSearch
        placeholder="To"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={cityOptions.map((option) => ({
          ...option,
          disabled: isToDisabled(option),
        }))}
        value={to}
        onChange={handleToChange}
      />

      <RangePicker
        className='custom-range-picker'
        format={dateFormat}
        defaultValue={[dayjs(today, dateFormat), null]} // Set the default value to today's date
        disabledDate={disabledDate} // Disable past days
        disabled= {[false, true]}
      />
    </>
  );
};

export default SearchBar;
