import React,{useState, useEffect} from 'react';
import GridCard from './GridCard.jsx';
import ControlledCarousel from './ControlledCarousel.jsx';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function App(){

  const {petId} = useParams();
  const [data,setData]=useState(undefined);
  const [selectedStyled, setSelectedStyled]=useState(undefined);//0??

  useEffect(()=>{
    axios({
      url:`/api/pet`,
      method:'get',
      params:{
        page:1
      }
    })
    .then((response)=>{
      console.log('response for all pet: ',response.data),
      setData(response.data);
    })
    .catch((err)=>{
      console.log('failed getting pets data: ', err);
    });

    axios({
      url:`/api/pet/${petId}`,
      method:'get',
    })
    .then((response)=>{
      console.log("response for one pet: ",response),
      setSelectedStyled(response.data);
    })
    .catch((err)=>{
      console.log('failed getting styled pet: ', err);
    });
  },[petId]);


  return (
    <div>
      <h1>Pet Ranking</h1>
      {selectedStyled && <ControlledCarousel />}
      {data && <GridCard />}
    </div>
  )
};