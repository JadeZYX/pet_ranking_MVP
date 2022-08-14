import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React,{useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';




function GridCard({data,indexOffset,setSelectedIndex,changeLike}) {


  const handleUpdateLike=function(element,index){

       axios({
        url:`/pet/${element._id}`,
        method:'put',
        data:{
          like:element.like+1,
        }
      })
      .then(()=>{
        alert("Thanks"),
        changeLike(indexOffset+index);
      })
      .catch((err)=>console.log('Err in put request',err));
  }

  return (
    <Row style={{width:'950px',marginBottom:'30px'}} xs={4} md={4} className="g-8">
      {data.map((e,idx) => (
        <Col key={idx}>
          <Card style={{height:"360px"}}onClick={()=>setSelectedIndex(indexOffset + idx)}>
            <Card.Img style={{height:'220px',objectFit:'cover'}} variant="top" src={e.images_id[0]} />
            <Card.Body>
              <Card.Title className='text'>{e.nickname}</Card.Title>
              <Card.Text>
               {e.category,e.age,e.location,e.addiction}
              </Card.Text>
              <div>
              <FontAwesomeIcon icon="fa fa-heart" className="hover:text-red-500" style={{color:'red'}} onClick={()=>{handleUpdateLike(e,idx)}}/>
              <span>&nbsp;&nbsp;{e.like }</span>
              </div>
            </Card.Body>
          </Card>
      </Col>
      ))}
    </Row>
  );
}

export default GridCard;