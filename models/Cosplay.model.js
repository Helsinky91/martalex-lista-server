const { Schema, model } = require("mongoose");

const CosplaySchema = new Schema({
    name: {
        type: String,
        required: true,  
    }, 
    image: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    },
    // family: {
    //     aquí linkear con la familia o escribir fam?
    // },
    description: String,
    choosedBy: {
        //feeds from User.model
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Cosplay = model("Cosplay", CosplaySchema);

module.exports = Cosplay;