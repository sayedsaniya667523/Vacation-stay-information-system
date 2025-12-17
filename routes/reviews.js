const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../util/WrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const {validateReview,isLoggedin,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js")

//review routes
//review post route
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.newReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;