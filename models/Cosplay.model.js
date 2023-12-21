const { Schema, model } = require("mongoose");

const CosplaySchema = new Schema({
    name: String, 
    nameDetails: String,
    image: String,
    cosplayImage: String,
    serie: String,
    serieDetails: String,
    descriptionCat: String,
    descriptionEsp: String,
    choosedBy: {
        //feeds from User.model
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    youtubeLink: String, 
    aliExpressLink: String, 
});

const Cosplay = model("Cosplay", CosplaySchema);

module.exports = Cosplay;