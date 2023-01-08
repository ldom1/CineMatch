import { Schema, models, model } from "mongoose"

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Missing FirstName"],
    trim: true,
  },

  lastname: {
    type: String,
    required: [true, "Missing LastName"],
  },

  mailaddress: {
    type: String,
    required: [true, "Missing MailAddress"],
    unique: true,
  },

  passwordhash: {
    type: String,
    required: [true, "Missing Hash"],
  },

  profilepic: {
    type: String,
  },

  adminLevel: {
    type: Number,
    default: 5,
  },
  verifyEmailCode: {
    type: String,
    required: [true, "Missing Code"],
  },
})

export default models.user || model("user", userSchema)
