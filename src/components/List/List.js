import React from "react";
import "./list.css";
import { useSelector } from "react-redux";
import airIndia from "../../assets/airIndia.png";
import jetAir from "../../assets/jetAirways.png";
import indigo from "../../assets/IndiGo.png";

const List = () => {
    const flights = useSelector((state => state.flights.flights));
    const logos ={
        "Air India" : airIndia,
        "Jet Airways": jetAir,
        "Indigo" : indigo
    }
    return(
        <div className="list-main">
            <div className="list-heading">
                <div>Sort By</div> 
                <div>DEPART</div>     
                <div>DURATION</div> 
                <div>ARRIVAL</div> 
                <div>SEATS</div> 
                <div>PRICE</div> 
            </div>
            <hr/>
            {
                flights && flights.map((flight) => {
                    return(
                        <div className="web-flight-view" key={flight} style={{width: "100%"}}>
                            <div className="flight-data">
                                <div>{flight.Airline}</div>
                                <div>{flight.Departure}</div>
                                <div className="duration">
                                    <div>{flight.Duration}</div>
                                </div>
                                <div>{flight.Arrival}</div>
                                <div>{flight["Seats Available"]}</div>
                                <div>₹{flight.Price}</div>
                            </div>
                        </div>
                    )
                })
            }

            <div className="mob-flight-view">
            {
                flights && flights.map((flight) => {
                    return(
                        
                            <div className="mob-flights">
                                <div>
                                    <img src={logos[flight.Airline]} alt={flight.Airline} width={40}/>
                                </div>
                                <div className="dep-arr">
                                    <div>
                                        {flight.Departure}
                                        <span>--{flight.Duration}--</span>
                                        {flight.Arrival}
                                    </div>
                                    <div className="dep-arr-seat">
                                        {flight.Airline} | Seats: {flight["Seats Available"]}
                                    </div>
                                </div>
                                <div>
                                    ₹{flight.Price}
                                </div>
                            </div>
                    )
                })
            }
            </div>


        </div>
    )
}

export default List;