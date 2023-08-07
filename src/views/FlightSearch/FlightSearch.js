import React, { useState, useEffect } from 'react';
import Head from '../../components/Header/Head';
import { Footer } from '../../components/Footer/Footer';
import { convertCsvToJson } from '../../service/service';
import Main from '../../components/FlightSearchBody/Main';
import { useDispatch } from 'react-redux';
import { setData, setCities } from '../../redux/slice/dataSlice';

const FlightSearch = () => {
  const dispatch = useDispatch();
  const [metadata, setMetaData] = useState(null);
  const [city, setCity] = useState(null);

  let temp = null;

    useEffect(() => {
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
      console.log(arrayOfObjects);
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
    );
}

export default FlightSearch;