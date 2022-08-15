const express = require('express');
const db = require('../database/index.js');
const model = require('../database/model.js');
const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/pet/:page',(req,res)=>{
  //console.log("show page: ",req.params.page);
  model.getAll(req.params.page,(err,result)=>{
    if(err){
      res.status(401).send("Err during get request")
    }
    else{
     //console.log("show result: ",result);
      res.json(result);
    }
  })
});

app.put('/pet/:id',model.updateLike);

app.post('/pet',model.addPet);

app.use(express.static(__dirname + '/../client/dist'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});