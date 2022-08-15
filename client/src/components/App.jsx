import React, { useState, useEffect } from 'react';
import GridCard from './GridCard.jsx';
import ControlledCarousel from './ControlledCarousel.jsx';
//import {useParams} from 'react-router-dom';
import axios from 'axios';
import Form from './Form.jsx';


export default function App() {

  // const {petId} = useParams();
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [isFirstPage,setIsFirstpage] = useState(true);

  const fetchAll = function(temPage){
   temPage = temPage||1;
    axios({
      url: `/pet/${temPage}`,
      method: 'get'
      // params: {
      //   page: temPage
      // }
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
  }

  const changeLike = function (index) {
    setData([
      ...data.slice(0, index),
      { ...data[index], ...{ like: data[index].like + 1 } },
      ...data.slice(index+1)])
  }

  useEffect(() => {
    fetchAll();
    // axios({
    //   url: `/pet`,
    //   method: 'get',
    //   params: {
    //     page: page
    //   }
    // })
    //   .then((response) => {
    //     console.log('response for all pet: ', response.data);
    //     if (response.data.length <= 8) {
    //       setIsLastPage(true);
    //     }
    //     setData(response.data.slice(0, 9));
    //   })
    //   .catch((err) => {
    //     console.log('failed getting pets data: ', err);
    //   });
  }, []);


  const handleLoadMore = function () {
    setPage(page + 1);
    setIsFirstpage(false);
    fetchAll(page+1);
  }

  const handlePreviousPage = function(){
    setPage(page-1);
    if(page===1){
      setIsFirstpage(true);
    }
    if(!isFirstPage){
     fetchAll(page-1);
    }
  }


  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h1>Pet Ranking</h1>
      <div>
        {data.length > 0 && <ControlledCarousel singleData={data[selectedIndex]} />}
      </div>
      {data.slice(0, 4) && <GridCard data={data.slice(0, 4)} indexOffset={0} setSelectedIndex={setSelectedIndex} changeLike={changeLike}/>}
      {data.slice(4, data.length - 1) && <GridCard data={data.slice(4, data.length - 1)} indexOffset={4} setSelectedIndex={setSelectedIndex} changeLike={changeLike} />}
      <div>
      {isLastPage ? null : (
        <button type="button" onClick={() => handleLoadMore()}>Next Page</button>
      )}
      <span style={{marginLeft:'122px'}}>{isFirstPage ? null: <button onClick={handlePreviousPage}>Previous Page</button> }</span>
      </div>
      <Form />
    </div>
  )
};