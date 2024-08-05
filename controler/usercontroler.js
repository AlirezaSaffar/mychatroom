const user = require('../models/user')
const express = require("express")
const messages = require('../models/messages')
const { ObjectId } = require('mongodb')
const joi = require("joi")
const loadash = require("lodash")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
class userscontroler{
    static signup = async(req,res)=>{
        var i;
        var us = await user.find();
       const schema ={
        username : joi.string().min(4).max(50).required(),
        password :joi.string().min(4).max(50).required()
}
          var hashpassword = await bycrypt.hash(req.body.password,10)
          var check=true;
          var isvalid= joi.object(schema).validate(req.body)
          for(i in us){
              if(us[i]["username"]==req.body.username){check = false;}
          }
          if(check){
           if(isvalid.error) return
            var newuserdata= {
              username:req.body.username,
              password:hashpassword
            }
          const newuser = new user(newuserdata);
        try{
         await newuser.save();
      }catch{
          console.log("err")
        } 
           }
}

    static login = async(req,res)=>{
        var i;
        var us = await user.find();
        var check = false;
        for(i in us){
            if(us[i]["username"]==req.body.username){
              check = bycrypt.compareSync(req.body.password,us[i]["password"]);
           }
        }
        if(check){
         var token= jwt.sign(req.body.username,"mysecretkey58963");
         }else{
         var token = false;
        }
         res.json(token).send();
}

    static search = async(req,res)=>{
      var i;
      var txt,check;
check=false;
      try{
    var n = jwt.verify(req.body.me,"mysecretkey58963")
    }catch(err){
      console.log(err)
    }
      var us = await user.find();
      var t;
      for(i in us){
        if(us[i]["username"]==req.body.friend){
         check=true;
         t = us[i]["contacts"];
         break;
        }
      }
      if(check){
var contacts = t.split('-');
for(i in contacts){
  if(contacts[i]==n){ 
    res.json("you already have this member in your contacts").send()
    return}
}
t= t+"-"+n;
await user.updateOne({ username:req.body.friend},{ $set: {contacts: t} } );



for(i in us){
  if(us[i]["username"]==n){
t = us[i]["contacts"];
break;
  }
}
t=t+"-"+req.body.friend;
await user.updateOne({ username:n },{ $set: {contacts: t} } );
res.json("you added a new contact").send()
      }else{ res.json("there is no contact with this name").send()  }


}

    static sendmessage =async(req,res)=>{
var sender= jwt.verify(req.body.sender,"mysecretkey58963")
var newmessage ={
  message:req.body.message,
  sender:sender,
  receiver:req.body.receiver
}
const newtable = new messages(newmessage);
        try{
         await newtable.save();
      }catch{
          console.log("err")
        }

    
}

    static showcontacts= async(req,res)=>{
      var us = await user.find();
      var i;
      for(i in us){
        if(us[i]["username"]==jwt.verify(req.body.name,"mysecretkey58963")){
          var txt = us[i]["contacts"];
          break;
        }     }
        res.json(txt).send();
    }

    static refresh=async(req,res)=>{
var mess= await messages.find()
var sw=new Array();
var messarray=new Array();
var i;
var sender=jwt.verify(req.body.sender,"mysecretkey58963")
var receiver= req.body.receiver
var k=0;
for(i in mess){
if(mess[i]["sender"]==sender&&mess[i]["receiver"]==receiver){
  messarray[k]=mess[i]["message"]
  sw[k]=true
  k++
}
if(mess[i]["receiver"]==sender&&mess[i]["sender"]==receiver){
  messarray[k]=mess[i]["message"]
  sw[k]=false
  k++
}

}
var messsend={
  messages: messarray,
  sw:sw
}
res.json(messsend).send();

    }
}

module.exports = userscontroler
