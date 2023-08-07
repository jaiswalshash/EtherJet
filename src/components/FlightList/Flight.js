import React, { useState } from "react";
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

    const handleSearch = () => {
        setLoader(true);
        setTimeout(executeAfter3Seconds, 3000);
        dispatch(setTourTo(toCity));
        dispatch(setTourFrom(fromCity));
        dispatch(setTourPax(pax));
        dispatch(setFlights(filterFlightsByCityAndSeats(flights, fromCity, toCity, pax)));
        console.log(filterFlightsByCityAndSeats(flights, fromCity, toCity, pax));
    }
    function filterFlightsByCityAndSeats(flights, fromCity, toCity, pax) {
        const filteredFlights = flights.filter((flight) => {
            return flight.To === toCity && flight.From === fromCity && pax <= flight["Seats Available"];
          });
          return filteredFlights;
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
                    min={0} // Set the minimum value to 0 to ensure only positive numbers are allowed
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch} className="button-17" style={{height:"2rem",
                    
                 }}>Modify Search</button>
            </div>
            <div className="flight-details">
                <div className="back-home">
                    <img src={left} width={25} alt=""/>
                    <div style={{cursor: "pointer"}} onClick={handleBack}>Back To Home</div>
                </div>
                <div className="tour">
                    {from} <img src={right} width={25}/> {to} <span className="tourdate" style={{opacity: "0.5"}}>| 06 Aug '23</span>
                </div>
                <div className="filter-sort" onClick={handleFilter}>
                    Filters
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