import { Schema, models, model } from "mongoose";

const countrySchema = new Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
})

const Country = models.Country || model("Country", countrySchema, "country");

export default Country;