import React, { useEffect, useState } from 'react';
import { Slider, Typography, Checkbox } from 'antd';
import "./filter.css";
import { useSelector } from 'react-redux';

const { Text } = Typography;

const Filter = ({close}) => {
    const flights = useSelector((state) => state.flights.flights);
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

    useEffect(() => {
        let min = 1e9;
        let max = 0;
        flights.map((flight) => {
            min =  Math.min(flight.Price, min);
            max = Math.max(flight.Price, max);
        })
        
        setMinValue(min);
        setMaxValue(max);
    }, [flights]);
    

    const handleSliderChange = (values) => {
        console.log(values);
        setMinValue(values[0]);
        setMaxValue(values[1]);
    };
    const [durationOptions, setDurationOptions] = useState({
        lessThan2Hours: false,
        between2And3Hours: false,
        greaterThan3Hours: false,
      });
    
      const handleDurationOptionChange = (option) => (e) => {
        setDurationOptions({ ...durationOptions, [option]: e.target.checked });
      };

      const airlineOptions = [
        { label: 'American Airlines', value: 'American Airlines' },
        { label: 'Delta Airlines', value: 'Delta Airlines' },
        { label: 'United Airlines', value: 'United Airlines' },
        
      ];

      const handleFilter = () => {
            close();
      }
    return(
        <>
            <div className='filter-head'>
                <div style={{fontSize: "medium",fontWeight: "bold" }}>Filter By</div>
                <div style={{fontSize: "small"}}>Reset All</div>
            </div>
            <hr/>
            <div>
                <div style={{fontSize: "0.8rem"}}>Price from</div>
                <Slider
                    range
                    min={minValue}
                    max={6500}
                    step={10}
                    defaultValue={[minValue, 6500]}
                    onChange={handleSliderChange}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>{minValue}</Text>
                    <Text>{maxValue}</Text>
                </div>
            </div>
            <hr/>
            <div>
            <div style={{fontSize: "0.8rem", margin:"1%"}}>Duration</div>
            <Checkbox
                checked={durationOptions.lessThan2Hours}
                onChange={handleDurationOptionChange('lessThan2Hours')}
            >
                {"<2 Hours"}
            </Checkbox>
            
            <Checkbox
                checked={durationOptions.between2And3Hours}
                onChange={handleDurationOptionChange('between2And3Hours')}
            >
                {"2 Hours to 3 Hours"}
            </Checkbox>
            
            <Checkbox
                checked={durationOptions.greaterThan3Hours}
                onChange={handleDurationOptionChange('greaterThan3Hours')}
            >
                {">3 Hours"}
            </Checkbox>
            </div>
            <hr/>
            <div style={{fontSize: "0.8rem", margin:"1%"}}>Airlines</div>
            <Checkbox.Group options={airlineOptions} />
            <div className='filter-close'>
                <button onClick={handleFilter}>Close</button>
            </div>
        </>
    )
}

export default Filter;
