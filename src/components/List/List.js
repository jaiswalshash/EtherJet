import React from "react";
import "./list.css";
import { useSelector } from "react-redux";
import airIndia from "../../assets/airIndia.png";
import jetAir from "../../assets/jetAirways.png";
import indigo from "../../assets/IndiGo.png";
import noData from "../../assets/paper.png"
import { useNavigate } from "react-router-dom";

const List = () => {
    const navigate = useNavigate();
    const flights = useSelector((state => state.flights.filtered));
    const logos ={
        "Air India" : airIndia,
        "Jet Airways": jetAir,
        "Indigo" : indigo
    }
    let error = false;
    if (flights === null || flights.length === 0 ) {
        error = true;
    }
    return(

        <div className="list-main">
            {
                error && 
                <div className="noData">
                    <img width={80} src={noData} alt=""/>
                    No Flights Available
                </div>
            }
            {!error && <>
            <div style={{fontWeight: "800"}} className="list-heading">
                <div>AIRLINE</div> 
                <div>DEPART</div>     
                <div>DURATION</div> 
                <div>ARRIVAL</div> 
                <div>SEATS</div> 
                <div>PRICE</div> 
            </div>
            <hr/>
            <div className="flight-view-web">{
                flights && flights.map((flight, idx) => {
                    return(
                        <div className="web-flight-view" key={idx} style={{width: "100%"}}>
                            <div className="flight-data">
                                <div>{flight.Airline}</div>
                                <div>{flight.Departure}</div>
                                <div>
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
            </div>

            <div className="mob-flight-view">
            {
                flights && flights.map((flight, idx) => {
                    return(
                        
                            <div key={idx} className="mob-flights">
                                <div>
                                    <img src={logos[flight.Airline]} alt={flight.Airline} width={40}/>
                                </div>
                                <div className="dep-arr">
                                    <div style={{display:"flex", alignItems:"center"}}>
                                        {flight.Departure}
                                        <span> --{flight.Duration}-- </span>
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
            </>}

        </div>
    )
}

export default List;