import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
//import styled from 'styled-components';


function ControlledCarousel({singleData}) {
 // console.log(singleData);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const photos = singleData.images_id;

  return (
    <div style={{margin:'60px'}}>
      <Carousel  activeIndex={index} onSelect={handleSelect}>>
        {photos.length>0 && photos.map((ele,index)=>(
        <Carousel.Item  key={index}>
          <img style={{height:'500px',width:'300px',objectFit:"cover"}}src={ele} alt="slider" className="d-block w-100"/>
          <Carousel.Caption>
        </Carousel.Caption>
        </Carousel.Item>))}
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;