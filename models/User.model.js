const { Schema, model } = require("mongoose");
const attendance = require("../utils/attendance");
const alergies = require("../utils/alergies");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    photo: {
      //! to change when choosing a cosplay??
      type: String,
    }, 
    cosplayId: [
      {
        //feeds from Cosplay.model
        type: Schema.Types.ObjectId,
        ref: "Cosplay",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  },


);

const User = model("User", userSchema);

module.exports = User;
