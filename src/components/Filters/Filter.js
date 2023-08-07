import React, { useEffect, useState } from 'react';
import { Slider, Typography, Checkbox } from 'antd';
import "./filter.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFlights } from '../../redux/slice/flightSlice';

const { Text } = Typography;

const Filter = ({close}) => {
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.data.data);
    const flights = useSelector((state) => state.flights.flights);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [airline, setAirline] = useState(["Air India", "Jet Airways", "Indigo"]); 
    const [toCity, setToCity] = useState(useSelector((state) => state.tour.to));
    const [fromCity, setFromCity] = useState(useSelector((state) => state.tour.from));
    const [pax, setPax] = useState(useSelector((state) => state.tour.pax));

    useEffect(() => {
        if (flights === null ) {
            navigate("/")
        }
        if (flights && flights.length === 0) {
            setMinValue(0);
            setMaxValue(0);
        }
        else if (flights){
            let min = 1e9;
            let max = 0;
            flights.map((flight) => {
                min =  Math.min(flight.Price, min);
                max = Math.max(flight.Price, max);
            })
            setMinValue(min);
            setMaxValue(max);
        }
        else if (!flights) {
            navigate("/")
        }
    }, []);
    

    const handleSliderChange = (values) => {
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
         dispatch(setFlights(filterFlights(flights,price, airline, durationOptions)));
         
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
  }

  const handleReset = () => {
    const filteredFlight = filterFlightsByCityAndSeats(data, fromCity, toCity, pax)
    dispatch(setFlights(filteredFlight)); 
    setAirline(["Air India", "Jet Airways", "Indigo"]);
    if (window.innerWidth < 1000){
        close();
    }
    }
    function filterFlightsByCityAndSeats(flights, fromCity, toCity, pax) {
        const filteredFlights = flights.filter((flight) => {
            return flight.To === toCity && flight.From === fromCity && pax <= flight["Seats Available"];
        });
        return filteredFlights;
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
                    min={minValue}
                    max={maxValue}
                    step={10}
                    defaultValue={[minValue, 8000]}
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
            <Checkbox.Group options={airlineOptions} 
                value={airline}
                defaultValue={["Air India", "Jet Airways", "Indigo"]}
            onChange={handleAirline} />
            <div className='filter-close'>
                <button onClick={handleFilter}>Close</button>
            </div>
            <hr/>
            <div style={{width: "100%", justifyContent: "end", display: "flex"}}>
                <button onClick={handleApplyFilter} style={{height: "1.5rem", width: "30%", border: "none"}} className='button-17'>Apply</button>
            </div>
        </>
    )
}


export default Filter;
