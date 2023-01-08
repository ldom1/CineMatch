import { Schema, models, model } from "mongoose"

const usersMoviesSchema = new Schema({
    user_movie_id: {
    type: String,
    required: [true, "Missing user_movie_id"],
    trim: true,
  },
  user_name : {
    type: String,
    required: [true, "Missing user_name"],
    trim: true,
  },
  movie_name : {
    type: String,
    required: [true, "Missing movie_name"],
    trim: true,
  },
  movie_id : {
    type: String,
    required: [true, "Missing movie_id"],
    trim: true,
  },
  rate : {
    type: Number,
    required: [true, "Missing rate"],
    trim: true,
  },
  rate_string : {
    type: String,
    required: [true, "Missing rate_string"],
    trim: true,
  },
  updated_at : {
    type: String,
    required: [true, "Missing updated_at"],
    trim: true,
  },
  timestamp : {
    type: String,
    required: [true, "Missing timestamp"],
    trim: true,
  },
})

export default models.users_movies || model("users_movies", usersMoviesSchema)
