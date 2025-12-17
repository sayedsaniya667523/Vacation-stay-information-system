const User = require("../models/users");

module.exports.userSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.postSignupForm = async(req,res)=>{
    try{
    let {username,email,password} = req.body;
    let users_info = await new User({username,email});
    let registeredUser = await User.register(users_info,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
    req.flash("success", "Welcome to Wanderlust!");
    res.redirect("/listings");
    });
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.userLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.postLoginForm = async(req,res)=>{
        req.flash("success","Welcome back to wanderlust");
        let redirectedUrl = res.locals.redirecturl||"/listings";
        res.redirect(redirectedUrl);
}

module.exports.userLogoutForm = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
}