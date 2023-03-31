const express = require("express");//use to create server
const mongoose = require('mongoose');//for database
const bodyParser = require( 'body-parser');//for parsing data
const ejs = require('ejs');//embedded javascript

const app = express();  //to acccess from app


app.set('view engine', 'ejs');   //to use all functionalites of ejs

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));  //to access all static files //////ike Html and class

mongoose.connect('mongodb+srv://admin-akash:Test123@cluster0.hfln0j2.mongodb.net/interviewDB?retryWrites=true&w=majority',{useNewUrlParser:true});    //  to create connection of //app to   local server

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  mobile:String,
  slot:String,
  companyId: String,
  status: String
  //add date time imput for the database
});

const User = mongoose.model("user",userSchema);

app.post("/create",function(req,res){    //
  const userData = new User({
    name:req.body.newName,
    email:req.body.newEmail,
    mobile:req.body.mobile,
    slot:req.body.time,
    companyId: req.body.companyId,
    status: "Scheduled on time"
  });

  User.findOne({slot: userData.slot, email: userData.email}, function(err, user) {  //seraching user and slot and email if same checing condio
    //for error page
    if(err) {
      res.render("error_page", {
        errorHeading: "404 error"
      });
    } else if(user) {
      res.render("error_page", {
        errorHeading: "Clash of Schedule between two different companies for one Candidate"
      });
    } else {
      userData.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log("User Saved Successfully");
          res.redirect("/list");
        }
      });
    }
  });

});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/create",function(req,res){
  res.sendFile(__dirname + "/create.html");
});

app.get("/list", async function(req,res){

  let slot1 = await User.count({slot: "slot 1"});
  let slot2 = await User.count({slot: "slot 2"});
  let slot3 = await User.count({slot: "slot 3"});
  let slot4 = await User.count({slot: "slot 4"});

//  console.log(slot1 + " " + slot2);

  // if(slot1 < 2) await User.updateMany({ slot: 'slot 1' }, { status: 'cancelled' });
  // if(slot2 < 2) await User.updateMany({ slot: 'slot 2' }, { status: 'cancelled' });
  // if(slot3 < 2) await User.updateMany({ slot: 'slot 3' }, { status: 'cancelled' });
  // if(slot4 < 2) await User.updateMany({ slot: 'slot 4' }, { status: 'cancelled' });
  if(slot1 < 2) {
    await User.updateMany({ slot: 'slot 1' }, { status: 'cancelled' });
  } else {
    await User.updateMany({ slot: 'slot 1' }, { status: 'Scheduled on time' });
  }

  if(slot2 < 2) {
    await User.updateMany({ slot: 'slot 2' }, { status: 'cancelled' });
  } else {
    await User.updateMany({ slot: 'slot 2' }, { status: 'Scheduled on time' });
  }

  if(slot3 < 2) {
    await User.updateMany({ slot: 'slot 3' }, { status: 'cancelled' });
  } else {
    await User.updateMany({ slot: 'slot 3' }, { status: 'Scheduled on time' });
  }

  if(slot4 < 2) {
    await User.updateMany({ slot: 'slot 4' }, { status: 'cancelled' });
  } else {
    await User.updateMany({ slot: 'slot 4' }, { status: 'Scheduled on time' });
  }

  User.find({},function(err,users){
      res.render("list",{
        users:users
      });
  })
});

app.get("/list/:userID/:option",function(req,res){
  const reqUserId = req.params.userID;
  const reqOption = req.params.option;
  if(reqOption === "delete"){
    User.deleteOne({_id:reqUserId},function(err){
      if(err){
        console.log(err);
      } else {
        console.log("Successfully Deleted User");
        res.redirect("/list");
      }
    });
  } else if(reqOption === "edit"){
    User.findOne({_id:reqUserId},function(err,user){
      res.render("edit",{
        user:user
      });
    });
  }
});

app.post("/:userID/edit",function(req,res){
  const reqUserId = req.params.userID;
  User.updateOne({_id:reqUserId},{slot:req.body.time},function(err,user){
    if(err){
      console.log(err);
    } else {
      console.log("Timings Updated Successfully",user);
      res.redirect("/list");
    }
  });
});

app.listen(3000 || process.env.PORT,function(err){
  if(!err){
    console.log("server started");
  } else {
    console.log(err);
  }
})
