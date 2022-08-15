const Pet = require("./db.js");
//console.log("show Pet in model.js: ", Pet);

exports.getAll=(page,callback)=>{
  console.log(page);
  Pet.find({}).sort('-like').skip(8*(page-1)).limit(9)
  //Pet.find({})
  .then((data)=>callback(null,data))
  .catch((err)=>callback(err));
};

exports.updateLike = (req,res)=>{
 // console.log(req.params, req.body);
  Pet.updateOne({_id:req.params.id},{$set:{like:req.body.like}})
  .then((result)=>res.status(204).send("Successfully update like number"))
  .catch((err)=>(
    console.log("Err during update request: ",err),
    res.status(400).send("Err during update request")));
};

exports.addPet = (req,res)=>{
  Pet.create(req.body)
  .then((result)=>res.sendStatus(201))
  .catch((err)=>(
    console.log("err in addPet: ",err),
    res.status(500).send("Err during post request")));
}