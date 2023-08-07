import React, {useState} from 'react';
import "./main.css";
import "../SearchBar/searchBar.css";
import SearchBar from '../SearchBar/SearchBar';
import { Select, InputNumber } from 'antd';
import rightArrow from "../../assets/right-arrow.png";
import exchange from "../../assets/exchange.png"
import user from "../../assets/user.png"
import { useSelector, useDispatch } from 'react-redux';
import tarvel from "../../assets/travel.jpg"
import { setTourTo, setTourFrom, setTourPax } from '../../redux/slice/TourSlice';
import { setFlights } from '../../redux/slice/flightSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Main = () => {
    const [type, setType] = useState("oneWay");
    const [imgSrc, setImgSrc] = useState(rightArrow);
    const [pax, setPax] = useState(useSelector((state) => state.tour.pax));
    const [to , setTo] = useState(useSelector((state) => state.tour.to));
    const [from , setFrom] = useState(useSelector((state) => state.tour.from));
    const flights = useSelector((state) => state.data.data);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setType(e);
        if (e === "oneWay") {
            setImgSrc(rightArrow);
        }
        else setImgSrc(exchange);
    }

    const handleInputChange = (value) => {
        if (value !== null && value > 0) {
          setPax(value);
        } 
    };

    const handleStart = (e) => {
        setTo(e)
    }

    const handleEnd = (e) => {
        setFrom(e)
    }

    const handleFlightSearch = () => {
        if (to === null || from === null || pax === null) {
            if (to === null) {
                alert("Please select a source!")
            }
            if (from === null) {
                alert("Please select a destination!")
            }
            if (pax === null) {
                alert("Please select number of passengers!")
            }
        }
        else {
            setLoader(true);
            setTimeout(executeAfter3Seconds, 3000)
            dispatch(setTourTo(to));
            dispatch(setTourFrom(from));
            dispatch(setTourPax(pax));
            dispatch(setFlights(filterFlightsByCityAndSeats(flights, from, to, pax)));
            console.log(filterFlightsByCityAndSeats(flights, from, to, pax));
            
            
        }
    }

    function executeAfter3Seconds() {
        setLoader(false);
        navigate("/flights")
    }   

    function filterFlightsByCityAndSeats(flights, fromCity, toCity, pax) {
        const filteredFlights = flights.filter((flight) => {
            return flight.To === toCity && flight.From === fromCity && pax <= flight["Seats Available"];
          });
          return filteredFlights;
      }

    return (
        <div className='main-body'> 
            {loader && <Loader/>}
            <div className='searchbar-section'
                style={{height: "30%"}}
            >
                <div className='search-details'>
                    <div className='tour-type'>
                        <img src={imgSrc} width={20} alt='tour'/>
                        <Select
                            style={{
                                width: "100%"
                            }}
                            value={type}
                            onChange={handleTypeChange}
                            options={[{
                                value: "oneWay",
                                label: "One Way"
                            },
                            {
                                value: "round",
                                label: "Round Trip",
                                disabled: true
                            }
                                
                            ]}
                        />
                    </div>
                    <div className='pax-no'>
                        <img src={user} alt ="" width={25}/>
                        <InputNumber
                            value = {pax}
                        
                            className="positiveNumericInput"
                            placeholder='Pax'
                            min={0} // Set the minimum value to 0 to ensure only positive numbers are allowed
                            onChange={handleInputChange}
                        />
                    </div>
                    
                </div>
                <div className='search-selects'>
                    <SearchBar start={handleStart} end={handleEnd} />
                    <button onClick={handleFlightSearch} className='button-17'>Search Flight</button>
                </div>
            </div>
            <div className='flight-list'>
                <img style={{width: "30%", height: "100%" }} src={tarvel} alt=''/>
            </div>
        </div>
    );
}

export default Main;