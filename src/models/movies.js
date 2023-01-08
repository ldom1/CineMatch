import { Schema, models, model } from "mongoose"

const moviechema = new Schema({
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
  nb_of_views : {
    type: Number,
    required: [true, "Missing nb_of_views"],
    trim: true,
  },
})

export default models.movies || model("movies", moviechema)
