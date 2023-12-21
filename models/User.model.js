const { Schema, model } = require("mongoose");
const attendance = require("../utils/attendance");

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, 'Introduce un email.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Introduce una contraseña.']
    },
    // photo: {
    //   //! to change when choosing a cosplay??
    //   type: String,
    // }, 
    cosplayId: [
      {
        //feeds from Cosplay.model
        type: Schema.Types.ObjectId,
        ref: "Cosplay",
        default: null,
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    attendance: [
      {
          type: String,
          enum: attendance,
      },
    ],
    alergies: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  },


);

const User = model("User", userSchema);

module.exports = User;
