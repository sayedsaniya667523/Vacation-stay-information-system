const express = require('express');
const router = express.Router();
const wrapAsync = require("../util/WrapAsync.js");
const Listing = require("../models/listing.js");
const session = require("express-session");
const flash = require("connect-flash");
const {isLoggedin,isOwner,validateSchema} = require("../middleware.js");
const { populate } = require('../models/review.js');
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


const listingController = require("../controllers/listings.js");


//Index Route && post new root
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin,upload.single('listing[image]'),wrapAsync(listingController.postingNewListing));


//create new root
router.get("/new",isLoggedin,listingController.renderNewListing);

//show route && update route && delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedin,isOwner,upload.single('listing[image]'),validateSchema,wrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner,wrapAsync(listingController.deleteListing));


//edit Route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.editListing));



module.exports = router;