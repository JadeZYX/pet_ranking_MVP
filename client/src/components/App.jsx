import React, { useState, useEffect } from 'react';
import GridCard from './GridCard.jsx';
import ControlledCarousel from './ControlledCarousel.jsx';
//import {useParams} from 'react-router-dom';
import axios from 'axios';
import Form from './Form.jsx';

export default function App() {

  // const {petId} = useParams();
  //const [selectedStyled, setSelectedStyled]=useState(undefined);//0??
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);


  const changeLike = function (index) {
    setData([
      ...data.slice(0, index),
      { ...data[index], ...{ like: data[index].like + 1 } },
      ...data.slice(index+1)])
  }

  useEffect(() => {
    axios({
      url: `/pet`,
      method: 'get',
      params: {
        page: page
      }
    })
      .then((response) => {
        console.log('response for all pet: ', response.data);
        if (response.data.length <= 8) {
          setIsLastPage(true);
        }
        setData(response.data.slice(0, 9));
      })
      .catch((err) => {
        console.log('failed getting pets data: ', err);
      });
    // axios({
    //   url:`/pet/${petId}`,
    //   method:'get',
    // })
    // .then((response)=>{
    //   console.log("response for one pet: ",response),
    //   setSelectedStyled(response.data);
    // })
    // .catch((err)=>{
    //   console.log('failed getting styled pet: ', err);
    // });
  }, {});

  //every time just show 8 items, how to check equal to 8?
  const handleLoadMore = function () {
    setPage(page + 1);
    // axios.
  }


  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h1>Pet Ranking</h1>
      <div>
        {data.length > 0 && <ControlledCarousel singleData={data[selectedIndex]} />}
      </div>
      {data.slice(0, 4) && <GridCard data={data.slice(0, 4)} indexOffset={0} setSelectedIndex={setSelectedIndex} changeLike={changeLike}/>}
      {data.slice(4, data.length - 1) && <GridCard data={data.slice(4, data.length - 1)} indexOffset={4} setSelectedIndex={setSelectedIndex} changeLike={changeLike} />}
      {isLastPage ? null : (
        <button type="button" onClick={() => handleLoadMore()}>Next Page</button>
      )}
      <Form />
    </div>
  )
};