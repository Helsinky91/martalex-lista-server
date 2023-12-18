const { Schema, model } = require("mongoose");
const family = require("../utils/family");
const alergies = require("../utils/alergies");

const CosplaySchema = new Schema({
    name: {
        type: String,
        required: true,  
    }, 
    image: {
        type: String,
        //! here to be fed by the json file.  HOW. 
        default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    },
    family: [
        {
            //! check how to filter this ???
            type: String,
            enum: family,
        },
    ],
    alergies: [
        {
            type: String,
            enum: alergies,
        }
    ],
    description: String,
    choosedBy: {
        //feeds from User.model
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    link1: String, //youtube
    link2: String, //aliexpress
});

const Cosplay = model("Cosplay", CosplaySchema);

module.exports = Cosplay;