import React, { useState, useEffect } from "react";
import "./flight.css";
import Filter from "../Filters/Filter";
import List from "../List/List";
import left from "../../assets/left-arrow.png";
import right from "../../assets/right-arrow.png"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { InputNumber } from "antd";
import { setTourFrom, setTourPax, setTourTo } from "../../redux/slice/TourSlice";
import { setFlights } from "../../redux/slice/flightSlice";  
import Loader from "../Loader/Loader";

const Main = () => {
    const [fromCity, setFromCity] = useState(useSelector((state) => state.tour.from));
    const [toCity, setToCity] = useState(useSelector((state) => state.tour.to));
    const [pax, setPax] = useState(useSelector((state) => state.tour.pax));
    const [filterClose, setFilterClose]  = useState(false); 
    const to = useSelector((state) => state.tour.to);
    const from = useSelector((state) => state.tour.from);
    const paxNo = useSelector((state) => state.tour.pax);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const flights = useSelector((state) => state.data.data);
    const [loader, setLoader] = useState(false);
    const filterFlights = useSelector((state) => state.flights.flights);
    const [priceSort, setPriceSort] = useState(false);
    const [seatSort, setSeatSort] = useState(false);
    const [durationSort, setDurationSort] = useState(false);
    
    useEffect(() => {
        if (toCity === null || fromCity === null ) {
            navigate("/")
        }

    }, [])
    const handleBack = () => { 
        navigate("/")
    }

    const handleFilter = () => {
        setFilterClose(true);
    }
    const handleFilterClose = () => {
        setFilterClose(false);
    }

    const handleInputChange = (value) => {
        if (value > -1) {
          setPax(value);
        } else {
          window.alert("Enter valid number")
        }
    };

    const handleStart = (e) => {
        setToCity(e);
    }

    const handleEnd = (e) => {
        setFromCity(e);
    } 
    function executeAfter3Seconds() {
        setLoader(false)
    }   

    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} '${today.getFullYear().toString().substr(-2)}`;

    const handleSearch = () => {
        setLoader(true);
        setTimeout(executeAfter3Seconds, 3000);
        dispatch(setTourTo(toCity));
        dispatch(setTourFrom(fromCity));
        dispatch(setTourPax(pax));
        dispatch(setFlights(filterFlightsByCityAndSeats(flights, fromCity, toCity, pax)));
    }
    function filterFlightsByCityAndSeats(flights, fromCity, toCity, pax) {
        const filteredFlights = flights.filter((flight) => {
            return flight.To === toCity && flight.From === fromCity && pax <= flight["Seats Available"];
          });
          return filteredFlights;
      }

      const handlePriceSort = () => {
        const sorted = sortFlights(filterFlights, priceSort);
        dispatch(setFlights(sorted));
        setPriceSort(!priceSort);
      }

      const handleDuration = () => {
        setDurationSort(!durationSort);
      }

      const handleSeats = () => {
        const sorted = sortFlightSeats(filterFlights, seatSort);
        dispatch(setFlights(sorted));
        setSeatSort(!seatSort);
      }

      function sortFlights(flights, increasing) {
        const comparePrices = (a, b) => {
          const priceA = parseInt(a.Price);
          const priceB = parseInt(b.Price);
          return increasing ? priceA - priceB : priceB - priceA;
        };
      
        flights = [...flights].sort(comparePrices);
        return flights;
      }

      function sortFlightSeats(flights, increasing) {
        const comparePrices = (a, b) => {
          const priceA = parseInt(a["Seats Available"]);
          const priceB = parseInt(b["Seats Available"]);
          return increasing ? priceA - priceB : priceB - priceA;
        };
      
        flights = [...flights].sort(comparePrices);
        return flights;
      }
    
    return(
        <div className='flight-main-body'> 
            {loader && <Loader/>}
            <div className='modify-searchbar'>
                <SearchBar start={handleStart} end= {handleEnd}/> 
                <InputNumber
                    value = {pax}
                
                    className="positiveNumericInput"
                    placeholder='Pax'
                    min={0} 
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch} className="button-17" style={{height:"2rem",
                    
                 }}>Modify Search</button>
            </div>
            <div className="flight-details">
                <div className="back-home">
                    <img src={left} width={25} alt=""/>
                    <div style={{cursor: "pointer", color: "#1677FF", fontWeight: "800"}} onClick={handleBack}>Back To Home</div>
                </div>
                <div className="tour">
                    {from} <img src={right} width={25}/> {to} <span className="tourdate" style={{opacity: "0.5"}}>| {formattedDate}</span>
                </div>
                <div className="filter-sort">
                    <div onClick={handleFilter} className="filter">Filters</div>
                    <div className="sorts">
                        <div>Sort By:</div> 
                        <div onClick={handlePriceSort} className="sort-button">Price</div>
                        |
                        <div onClick={handleSeats} className="sort-button">Seats</div>
                        |
                        <div style={{cursor: "no-drop"}} className="sort-button" onClick={handleDuration} >Duration</div>
                    </div>
                </div>
            </div>
            <div className="flightList">
                 <div className="filter-main"><Filter /></div>
                 {filterClose && <div className= "mob-filter"><Filter close={handleFilterClose}/></div>}
                <List/>
            </div>
        </div>
    )
}

export default Main