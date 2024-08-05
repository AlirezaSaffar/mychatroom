const user = require('../models/user')
const jwt = require('jsonwebtoken')
function checkto(req,res,next){

try{

  var name=  jwt.verify(req.body.token,"mysecretkey58963")
  var us =  user.find();
  var check=false;
  for(i in us){
      if(us[i]["username"]==name){check = true;}
   
  }
  console.log(check)
  if(check)next()
}catch(err){
    res.status(401).send();
}


}

module.exports= checkto