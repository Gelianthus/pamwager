import { Schema, models, model } from "mongoose";

const PriceSchema = new Schema(
  {
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const metalSchema = new Schema({
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    unit: {
      code: { type: String, required: true },
      label: { type: String, required: true },
      symbol: { type: String, required: true }
    },
    prices: [PriceSchema]
  },
  { timestamps: true })

const Metal = models.Metal || model("Metal", metalSchema, "metal");

export default Metal;

