const Listing = require("../models/listing");

module.exports.index = async (req,res)=>{
    let lists = await Listing.find({});
    res.render("listings/index.ejs",{lists});
}

module.exports.renderNewListing = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.postingNewListing = async (req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = {url,filename};
    await newList.save();
    req.flash("success","new listing added successfully!");
    res.redirect("/listings");
}

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id).populate({path : "reviews",populate:{path : "author"}}).populate("owner");
    if(!list){
        req.flash("error","Listing you are looking forward, is not available");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}

module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list){
        req.flash("error","Listing you are looking forward to update, is not available");
        return res.redirect("/listings");
    }
    let originalUrl = list.image.url;
    let originalImageUrl = originalUrl.replace("/upload","/upload/h_250,w_300");
    res.render("listings/edit.ejs",{list,originalImageUrl});
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename}; 
    await listing.save();
    }
    req.flash("success","listing updated successfully!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","listing deleted successfully!");
    res.redirect("/listings");
}