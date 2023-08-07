import React, {useEffect, useState} from 'react'
import Head from "../../components/Header/Head"
import { Footer } from '../../components/Footer/Footer'
import Main from '../../components/FlightList/Flight.js'
import { useSelector, useDispatch } from 'react-redux';
import { setData, setCities } from '../../redux/slice/dataSlice';
import { convertCsvToJson } from '../../service/service';
import { useNavigate } from 'react-router-dom';

export const FlightList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [metadata, setMetaData] = useState(useSelector((state) => state.data.data));
  const [city, setCity] = useState(useSelector((state) => state.data.cities));

  let temp = null;
  useEffect(() => {
    if (metadata === null || city === null) {
      navigate("/")
    }
    const csvFilePath = '/Project.csv';
    convertCsvToJson(csvFilePath)
      .then((jsonData) => {
        setMetaData(jsonData)
        dispatch(setData(jsonData));
        temp = getCitiesFromArrayOfObjects(jsonData);
        setCity(temp);
        dispatch(setCities(temp));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}, []);

function getCitiesFromArrayOfObjects(arrayOfObjects) {
  let cities = [];
  const uniqueCities = new Set();
  arrayOfObjects.map((obj) => {
    uniqueCities.add(obj.From);
    uniqueCities.add(obj.To);
  });
  const arr = Array.from(uniqueCities);
  arr.map((i) => {
    let obj = {
      value: i,
      label: i
    };
    cities.push(obj);
  });
  return cities;
}
  return (
    <>
        <Head/>
        {metadata && city && <Main/>}
        <Footer/>
    </>
  )
}
