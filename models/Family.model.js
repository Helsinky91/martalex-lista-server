const { Schema, model } = require("mongoose");

const familySchema = new Schema(
    {
        Serie: String,
    },
    {
        SerieDetails: String
    },
    );
    
    const Family = model("Family", familySchema);
    
    module.exports = Family;
    