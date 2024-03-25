const { Schema, model } = require("mongoose");
const attendance = require("../utils/attendance");
const bcrypt = require("bcryptjs");
const lunch = require("../utils/lunch");


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
    cosplayId: {
        //feeds from Cosplay.model
        type: Schema.Types.ObjectId,
        ref: "Cosplay",
        default: null,
    },
    
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
      lunch: [
        {
            type: String,
            enum: lunch,
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
