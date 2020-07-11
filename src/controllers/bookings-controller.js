const express=require('express');
//import { UserModel } from '..models';
const Router=express.Router();
const pool=require('../datasources/db');
const verify = require('./verifyToken');

Router.post("/postBookingDestails",verify , (req,res) =>{
    pool.query("Insert into bookings(user_id, room_id, from_date, to_date, is_active, checked_in, is_cancelled) values('?',(select room.id from room where room_number='?'),'?','?','Yes','No','No');",(err,rows,field)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

Router.post("/postUpdateBookingDetails", verify ,(req,res) =>{
    var user_id=req.body.user_id;
    var room_id=req.body.room_id;
    pool.query("UPDATE bookings SET is_active='No' where user_id=? AND room_id=?;",[user_id,room_id],(err,rows,field)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

Router.get("/getAvailableRoomDetails", verify ,(req,res) =>{
    pool.query("UPDATE bookings SET is_active='No' where user_id=? AND room_id=?;",(err,rows,field)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


module.exports=Router;