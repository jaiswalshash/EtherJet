import React, { useState, useEffect } from 'react';
import Head from '../../components/Header/Head';
import { Footer } from '../../components/Footer/Footer';
import { convertCsvToJson } from '../../service/service';
import Main from '../../components/FlightSearchBody/Main';
import { useDispatch } from 'react-redux';
import { setData, setCities } from '../../redux/slice/dataSlice';

const FlightSearch = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        const csvFilePath = '/Project.csv';
        convertCsvToJson(csvFilePath)
          .then((jsonData) => {
            console.log(jsonData)
            dispatch(setData(jsonData));
            let cities = getCitiesFromArrayOfObjects(jsonData);
            dispatch(setCities(cities));
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
          value: i.toLowerCase(),
          label: i
        };
        cities.push(obj);
      });
      return cities;
    }
     
    return (
        <>
            <Head/>
            <Main/>
            <Footer/>
        </>
    );
}

export default FlightSearch;