import React, { useEffect, useState } from 'react';
import { Slider, Typography, Checkbox } from 'antd';
import "./filter.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilterd } from '../../redux/slice/flightSlice';
import { setAir, setValues } from '../../redux/slice/filterSlice';

const { Text } = Typography;

const Filter = ({close, paxNo, flightData, render}) => {
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    let flights = (useSelector((state) => state.flights.flights));
    const [airline, setAirline] = useState(useSelector((state) => state.filter.airline)); 
    let maxP = useSelector((state) => state.flights.max);
    let minP = useSelector((state) => state.flights.min);
    const [minValue, setMinValue] = useState(useSelector((state) => state.flights.max));
    const [maxValue, setMaxValue] = useState(useSelector((state) => state.flights.max));
    

    useEffect(() => {
        setMinValue(minP);
        setMaxValue(maxP);
        setAirline(["Air India", "Jet Airways", "Indigo"]);
    }, [render])

    const formatter = (value) => `₹${value}`;
    useEffect(() => {
        if (localStorage.getItem("min") && localStorage.getItem("min") && window.innerWidth < 1000) {
            
            let x = localStorage.getItem("min");
            let y = localStorage.getItem("max");
            setMinValue(x);
            setMaxValue(y);
        }
        if (flights === null ) {
            navigate("/")
        }
        if (flights && flights.length === 0) {
            setMinValue(0);
            setMaxValue(0);
        }
        else if (!flights) {
            navigate("/")
        }
    }, []);
    

    const handleSliderChange = (values) => {
        
        dispatch(setValues(values));
        setMinValue(values[0]);
        setMaxValue(values[1]);
    };
    const [durationOptions, setDurationOptions] = useState({
        lessThan2Hours: true,
        between2And3Hours: true,
        greaterThan3Hours: true,
      });
    
      const handleDurationOptionChange = (option) => (e) => {
        setDurationOptions({ ...durationOptions, [option]: e.target.checked });
      };

      const airlineOptions = [
        { label: 'Air India', value: 'Air India' },
        { label: 'Jet Airways', value: 'Jet Airways' },
        { label: 'Indigo', value: 'Indigo' },
        
      ];
      

      const handleFilter = () => {
            close();
      }

      const handleApplyFilter = () => {
         const price = {
            min: minValue,
            max : maxValue
         }
         localStorage.setItem("min", minValue);
         localStorage.setItem("max", maxValue);
         dispatch(setFilterd(filterFlights(flights,price, airline, durationOptions)));
            if (window.innerWidth < 1000){
                close();
            }
      }

      
      function filterFlights(flights, priceRange, airlines, duration) {
        return flights.filter(flight => {
          const flightPrice = parseInt(flight.Price); 
          return (
            flightPrice >= priceRange.min && flightPrice <= priceRange.max &&
            (airlines.length === 0 || airlines.includes(flight.Airline))
          );
        });
      }
      

  const handleAirline = (e) => {
    setAirline(e);
    dispatch(setAir(e))
  }

  const handleReset = () => {
    if (localStorage.getItem("max")) {
        localStorage.removeItem("max");
        localStorage.removeItem("min");
    }
    
    setMaxValue(maxP);
    setMinValue(minP);
    dispatch(setFilterd(flights)); 
    setAirline(["Air India", "Jet Airways", "Indigo"])
    dispatch(setAir(["Air India", "Jet Airways", "Indigo"]));
    if (window.innerWidth < 1000){
        close();
    }
    }


    return(
        <>
            <div className='filter-head'>
                <div style={{fontSize: "medium",fontWeight: "bold" }}>Filter By</div>
                <div onClick={handleReset} className='reset-btn' style={{fontSize: "small"}}>Reset All</div>
            </div>
            <hr/>
            <div>
                <div style={{fontSize: "0.8rem"}}>Price from</div>
                <Slider
                    range
                    min={minP}
                    max={maxP}
                    tooltip={{
                        formatter,
                      }}
                    // defaultValue={[minP, maxP]}
                    value={[minValue, maxValue]}
                    onChange={handleSliderChange}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>₹{minValue}</Text>
                    <Text>₹{maxValue}</Text>
                </div>
            </div>
            <hr/>
            <div className='duration-disable'>
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
            <Checkbox.Group options={airlineOptions} 
                value={airline}
                defaultValue={["Air India", "Jet Airways", "Indigo"]}
            onChange={handleAirline} />
            <div className='filter-close'>
                <button style={{color: "black"}} onClick={handleFilter}>Close</button>
            </div>
            <hr/>
            <div style={{width: "100%", justifyContent: "end", display: "flex"}}>
                <button onClick={handleApplyFilter} style={{height: "1.5rem", width: "30%", border: "none", color: "#1677ff"}} className='button-17'>Apply</button>
            </div>
        </>
    )
}


export default Filter;