const mongoose = require("mongoose");
const schema = mongoose.Schema;
const review = require("./review.js");

const listingschema = new schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image: {
      url : String,
      filename : String
  },
    price : Number,
    location : String,
    country : String,
    reviews :[
      {
      type:schema.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner : {
    type : schema.Types.ObjectId,
    ref : "User"
  }
});

listingschema.post("findOneAndDelete",async(listing)=>{
  console.log(listing);
  await review.deleteMany({_id : {$in :listing.reviews}});
});

const Listing = new mongoose.model("Listing",listingschema);
module.exports = Listing;