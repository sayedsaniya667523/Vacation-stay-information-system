if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./util/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/users.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

let sessionOption = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now()+7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }
};

app.use(session(sessionOption));
app.use(flash());

// //demo user
// app.get("/register",async(req,res)=>{
//     let fakeUser = new User({
//         username : "sigma-student",
//         email : "apnacollege@google.com"
//     });
//     let userdemo = await User.register(fakeUser,"hello");
//     console.log(userdemo);
// });

//passport authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


main().then((res)=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await  mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

app.get("/",(req,res)=>{
    res.send("Connection Successfull");
});

//listing routes
app.use("/listings",listingRouter);
//review routes
app.use("/listings/:id/reviews",reviewRouter);
//user routes
app.use("/",userRouter);


app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

app.use((err,req,res,next)=>{
    let {status=500,message} = err;
    res.status(status).render("error.ejs",{message});
});


app.listen(8080,()=>{
    console.log("Server is listening at the port : 8080");
});