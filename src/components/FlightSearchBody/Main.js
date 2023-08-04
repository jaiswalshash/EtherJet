import React, {useState} from 'react';
import "./main.css";
import SearchBar from '../SearchBar/SearchBar';
import { Select } from 'antd';
import rightArrow from "../../assets/right-arrow.png"

const Main = () => {
    const [collapsed, setCollapsed] = useState(false); 
    const [height, setHeight] = useState("25%");
    const temp = () => {
        if (window.innerWidth > 600) {
            if (collapsed) {
                setHeight("25%")
            }
            else {
                setHeight("8%")
            }
            setCollapsed(!collapsed);
        }
        
    }

    return (
        <div className='main-body'> 
            <div className='searchbar-section'
                onClick={temp}
                style={{height: "25%"}}
            >
                <div className='search-details'>
                    <div className='tour-type'>
                        <img src={rightArrow} width={20} alt=''/>
                        <Select
                            style={{
                                width: "8rem"
                            }}
                            defaultValue={"One Way"}
                            options={[{
                                value: "oneWay",
                                label: "One Way"
                            },
                            {
                                value: "round",
                                label: "Round Trip"
                            }
                                
                            ]}
                        />
                    </div>
                    
                </div>
                <div className='search-selects'>
                    <SearchBar/>
                </div>
            </div>
            <div className='flight-list'>

            </div>
        </div>
    );
}

export default Main;