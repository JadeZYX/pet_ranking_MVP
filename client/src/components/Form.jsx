import React,{useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
//require('dotenv').config();

const Container = styled('div')`
  background-color: #F5EDDC;
  width:100%;
  height:100%;
  top:0;
  position:fixed;
  z-index:90;
`;
const Input = styled('input')`
background-color:#B1BCE6;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width:30%;
  border-radius: 10px;
  opacity: 0.8;
`;

export default function Form(){

  const [showModal,setShowModal]=useState(false);
  const [category,setCategory]=useState(undefined);
  const [nickname, setNickname] = useState(undefined);
  const[age,setAge]=useState(undefined);
  const[location,setLocation]=useState(undefined);
  const[addiction, setAddiction]=useState(undefined);
  const[photosUrl,setPhotosUrl]=useState([]);
  const [photosUploadFile, setPhotosUploadFile] = useState([]);

  const handlePhotosChange = function(event){
    setPhotosUploadFile(event.target.files);
  }
// cloudinary to store pictures
  const handlePhotosUpload = async function(event,files){
    event.preventDefault();
    if (files.length <= 6) {
      const url = [];
      const promisesUpload = [];
      for (let i = 0; i < files.length; i += 1) {
        const currentFile = files[i];
        const formData = new FormData();
        formData.append('file', currentFile);
        formData.append('upload_preset', 'f3bq7tgi');
        promisesUpload.push(
          axios
            .post(
              'https://api.cloudinary.com/v1_1/dnfqddlmx/image/upload',
              formData,
            )
            .then((res) => {
              url.push(res.data.url);
            })
            .catch((err) => console.log('Error for uploading photos')),
        );
      }
      Promise.all(promisesUpload)
        .then(() => { setPhotosUrl(url), alert("Upload successfully")});
    } else {
      alert('Maxium 6 photos please');
    }

  }

  const option = {
    url:'/api/pet',
    method: 'POST',
    data: {
      category:category,
      nickname:nickname,
      age:age,
      location:location,
      addiction:addiction,
      images_id:photosUrl
    }
  }

  const handleSubmitForm = function(event){
    event.preventDefault(event);
    axios(option)
    .then((newdata)=>console.log(newdata))
    .catch((err)=>console.log(err));
  }
  return (
    <div>
      <button type = "button" onClick={()=>setShowModal(true)}>Share your favourite pet ? </button>
      {showModal && (<Container>
        <button type="button" onClick={()=>setShowModal(false)}>Go Back</button>
        <h1>Pet Information</h1>
        <form onSubmit={(event)=>handleSubmitForm(event)}>
          <label>Category</label>
          <select required onChange={(event)=>setCategory(event.target.value)}>
            <option value = "">--Please choose an option--</option>
            <option value = "Dog">Dog</option>
            <option value = "Cat">Cat</option>
            <option value = "Fish">Fish</option>
            <option value = "Rabbit">Rabbit</option>
            <option value = "Parrot">Parrot</option>
          </select>
          <label>Nickname
            <input maxLength={20} onChange={(event)=>setNickname(event.target.value)} required />
          </label>
          <label>Age
            <input onChange={(event)=>setAge(event.target.value)} />
          </label>
          <label>Location
            <input maxLength={30} onChange={(event)=>setLocation(event.target.value)} />
          </label>
          <label>Addiction
            <input maxLength={100} onChange={(event)=>setAddiction(event.target.value)} />
          </label>
          <label>Select photos (Limit 6)
            <input type="file" accept="image/*" multiple="multiple" onChange={(event)=>handlePhotosChange(event)} required />
            <button type="button" onClick={(event)=>handlePhotosUpload(event,photosUploadFile)}> UPLOAD </button>
          </label>
          <Input type="submit" required />
        </form>
      </Container>)}
    </div>
  )
};