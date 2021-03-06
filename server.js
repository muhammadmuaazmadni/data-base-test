// var express =require("express");
// var bodyParser =require("body-parser");
// var cors =require("cors");
// var morgan =require("morgan");
// var mongoose =require("mongoose");

// let dbURI = "mongodb+srv://bduser.dbpassword@cluster0.9qvbs.mongodb.net/abc-database";
// mongoose.connect(dbURI,{useNewUrlparser:true, nseUnifiedTopology : true});

// mongoose.connection.on('connected' ,function(){
//     console.log("mongoose is connected")
// });
// mongoose.connection.on('disconnected' ,function(){
//     console.log("mongoose is disconnected")
// process.exit(1);
// });
// mongoose.connection.on('error' ,function(err){
//     console.log("mongoose connection error" ,err)
// process.exit(1);
// });

// process.on('SIGNIT',function() {
// console.log("app is termenating")
// mongoose.connection.close(function(){
//     console.log("mongoose default connection closed")
//     process.exit(0);
// });
// });

// var userSchema = new mongoose.schema({
//     name: String,
//     email: String,
//     password: String,
//     phone: String,
//     gender: String,
//     createdOn :{type :Date ,'default ':Date.now}
// });

// var userModel = mongoose.model("users",userschema)

// var app =express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan('dev'));

// app.post("/signup",(req,res,next)=>{

// if(!req.body.name
//    ||!req.body.email
//    ||!req.body.password
//    ||!req.body.phone
//    ||!req.body.gender){

//     res.status(403).send(`
//         please send me name,email,password,phone and gender in json body.
//         e.g:
//         {
//             "name": "malik",
//                 "email": "malikasinger@gmail.com",
//                 "password": "abc",
//                 "phone": "03001234567",
//                 "gender": "Male"
//         } `)
//         return;
//    }

//    var newUser = new userModel({
//     "name": req.body.name,
//     "email": req.body.email,
//     "password": req.body.password,
//     "phone": req.body.phone,
//     "gender": req.body.gender,
//    })
// newUser.save((err,data)=>{

//     if(!err){
//         res.send("user created")
//     }else{
//         console.log(err);
//         res.status(500).send("user create error ," + err)
//     }

// });
// const PORT =process.env.PORT || 3000
// app.listen(PORT , ()=>{
//     console.log("server is running on :",PORT);
// })


// });



var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
const mongoose = require("mongoose");


let dbURI = "mongodb+srv://dbuser:dbpassword@cluster0.9qvbs.mongodb.net/abc-database";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {
    
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    createdOn: { type: Date, 'default': Date.now }
});
var userModel = mongoose.model("users", userSchema);


var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));


app.post("/signup", (req, res, next) => {

    if (!req.body.name
        || !req.body.email
        || !req.body.password
        || !req.body.phone
        || !req.body.gender) {

        res.status(403).send(`
            please send name, email, passwod, phone and gender in json body.
            e.g:
            {
                "name": "malik",
                "email": "malikasinger@gmail.com",
                "password": "abc",
                "phone": "03001234567",
                "gender": "Male"
            }`)
        return;
    }

    var newUser = new userModel({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "phone": req.body.phone,
        "gender": req.body.gender,
    })

    newUser.save((err, data) => {
        if (!err) {
            res.send("user created")
        } else {
            console.log(err);
            res.status(500).send("user create error, " + err)
        }
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})
