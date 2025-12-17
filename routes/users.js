const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../util/WrapAsync.js");
const User = require("../models/users.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.userSignUpForm)
.post(wrapAsync(userController.postSignupForm));

router.route("/login")
.get(userController.userLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login' ,failureFlash : true}),
    wrapAsync(userController.postLoginForm));

router.get("/logout",userController.userLogoutForm);

module.exports = router;