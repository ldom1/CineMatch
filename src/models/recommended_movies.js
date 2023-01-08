import { Schema, models, model } from "mongoose"

const recommendedMovieschema = new Schema({
  movie_name: {
    type: String,
    required: [true, "Missing movie_name"],
    trim: true,
  },
  movie_id : {
    type: String,
    required: [true, "Missing movie_id"],
    trim: true,
  },
  movie_url : {
    type: String,
    required: [true, "Missing movie_url"],
    trim: true,
  },
  movie_year : {
    type: String,
    required: [true, "Missing movie_year"],
    trim: true,
  },
  director : {
    type: String,
    required: [true, "Missing director"],
    trim: true,
  },
  category : {
    type: String,
    required: [true, "Missing category"],
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
  duration : {
    type: String,
    required: [true, "Missing duration"],
    trim: true,
  },
  first_category : {
    type: String,
    required: [true, "Missing first_category"],
    trim: true,
  },
  movie_date : {
    type: String,
    required: [true, "Missing movie_date"],
    trim: true,
  },
  rate : {
    type: Number,
    required: [true, "Missing rate"],
    trim: true,
  },
  rank : {
    type: Number,
    required: [true, "Missing rank"],
    trim: true,
  },
})

export default models.recommended_movies || model("recommended_movies", recommendedMovieschema)
