//jshint esversion: 6

const express =require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app =express();
const https=require ("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
 });

app.listen(process.env.PORT || 3000,function(){
   console.log("Server is running on Port:3000");
 });

app.post("/",function(req,res){
const firstName =req.body.first_name;
const email =req.body.email;
const lastName =req.body.last_name;
console.log("Fisrt Name:"+firstName+" Last Name:"+lastName+" Email:"+email);


var data={
  members:[
    {
      "email_address":email,
      "status": "subscribed",

      "merge_fields": {
        "FNAME":firstName,
        "LNAME":lastName
      }
    }
  ]
};

const jsonData=JSON.stringify(data);

const url="https://us8.api.mailchimp.com/3.0/lists/0f26b14562";
const options ={
  method:"POST",
  auth:"ALEKH:bba7ba147f19b2b92810798f9923a500-us8"
}
const request=https.request(url, options,function(response){
if( response.statusCode ===200){
  res.sendFile(__dirname + "/success.html")
}else{
  res.sendFile(__dirname + "/failure.html")
}
response.on("data",function(data){
  console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();
});





// API KEY
// bba7ba147f19b2b92810798f9923a500-us8

// LIST ID
 // 0f26b14562
