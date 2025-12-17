const express = require('express');
const app = express();
const users = require("./routers/users.js");
const posts = require("./routers/posts.js");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const flash = require("connect-flash");
const path = require("path");

let sessionargument = {
    secret: 'supersecretsecuritycode',
    resave: false,
    saveUninitialized: true,
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(session(sessionargument));
app.use(flash());

app.use((req,res,next)=>{
    console.log("connected");
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name="Anoynomous"} = req.query;
    req.session.name = name;
    if(name === "Anoynomous"){
        req.flash("error","user is not registered");
    }else{
        req.flash("success","user registered successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name :req.session.name});
});

app.listen("3000",()=>{
    console.log("Server is listening at the port : 3000");
});