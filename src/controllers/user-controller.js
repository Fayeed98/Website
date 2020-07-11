const express=require('express');
//import { UserModel } from '..models';
const Router=express.Router();
const pool=require('../datasources/db');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
//const Router = Router();

Router.get("/ping", (req,res) =>{
    //res.json({ message: 'Running' });
    pool.query("select * from user;",(err,rows,field)=>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    })
})

Router.post("/getUserAuthzDetails", (req,res) =>{
    var user_name=req.body.user_name;
    var password=req.body.password;

    pool.query('SELECT * FROM user WHERE user_name = ?',[user_name], function (error, results, fields) {
        console.log(results);
     if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){           
            if(password==results[0].password) {   
            //res.json({
              //      status:true,
                   // message:'successfully authenticated'
                //})
            const token = jwt.sign({user_name:user_name}, 'token-secret');
            //res.json(token);
            res.json({"token": token});
            }else{
                res.json({
                  status:false,
                  message:"Username and password does not match"
                 });
            } 
}
}  
    })
})

Router.post("/postUserDetails", (req,res) =>{
    var user = new User({
        //fullName: req.body.fullName,
        userName: req.body.firstName,
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
        })
    
    pool.query('INSERT INTO user SET ?',user, function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          })
        }else{
            res.json({
              status:true,
              data:results,
              message:'user registered sucessfully'
          })
        }
  
    })
})

Router.get("/getCheckinStatus/:user_id", verify ,(req,res) =>{
    var user_id=req.params.user_id;
    //console.log(user_id);
    pool.query("SELECT premise_name,floor_number,room_number,from_date,to_date,checked_in from premise INNER JOIN floor on premise.ID=floor.premise_id INNER JOIN room on floor.id=room.floor_id INNER JOIN bookings on room.id=bookings.room_id where bookings.is_active='Yes' and bookings.user_id=? and bookings.checked_in='Yes'",[user_id],(err,rows,field)=>{
        //console.log(query.sql);
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    }
    )
})

Router.get("/getUserUpcomingBooking", verify ,(req,res) =>{
    var user_id=req.body.user_id;
    pool.query("SELECT premise_name,floor_number,room_number,from_date,to_date,checked_in from premise INNER JOIN floor on premise.ID=floor.premise_id INNER JOIN room on floor.id=room.floor_id INNER JOIN bookings on room.id=bookings.room_id where bookings.is_active='Yes' and bookings.user_id=?;",[user_id],(err,rows,field)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    }
    )
})

Router.get("/getUserPastBooking", verify ,(req,res) =>{
    var user_id=req.body.user_id;
    pool.query("SELECT premise_name,floor_number,room_number,from_date,to_date,checked_in from premise INNER JOIN floor on premise.ID=floor.premise_id INNER JOIN room on floor.id=room.floor_id INNER JOIN bookings on room.id=bookings.room_id where bookings.is_active='No' and bookings.user_id=?; ",[user_id],(err,rows,field)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    }
    )
})

Router.get("/getUserCancelledBooking", verify ,(req,res) =>{
    var user_id=req.body.user_id;
    pool.query("SELECT premise_name,floor_number,room_number,from_date,to_date from premise INNER JOIN floor on premise.ID=floor.premise_id INNER JOIN room on floor.id=room.floor_id INNER JOIN bookings on room.id=bookings.room_id where bookings.user_id=? and bookings.is_cancelled='Yes';",[user_id],(err,rows,field)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    }
    )
})

Router.put("/putUpdateUserCheckinStatus", verify ,(req,res) =>{
    var user_id=req.body.user_id;
    var room_id=req.body.room_id;
    pool.query("UPDATE bookings SET checked_in = 'Yes' WHERE bookings.user_id = ? and bookings.room_id=?;",[user_id,room_id],(err,rows,field)=>{
        if(!err){
            res.status(200).send('updated');
        }
        else{
            console.log(err);
        }
    }
    )
})

module.exports=Router;