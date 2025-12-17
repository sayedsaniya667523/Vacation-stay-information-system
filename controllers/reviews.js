const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.newReview = async(req,res)=>{
    let list = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;

    list.reviews.push(newreview);

    await newreview.save();
    await list.save();
    req.flash("success","review added successfully!");

    res.redirect(`/listings/${list._id}`);
}

module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted successfully!");

    res.redirect(`/listings/${id}`);
}