import { Schema, model, Types } from 'mongoose';

const ImageSchema = new Schema({
  _id: { type: Types.ObjectId, default: () => new Types.ObjectId(), required: true },
  url: { type: String, required: true }
});

const Hero = new Schema({
  nickname: { type: String, required: true },
  real_name: { type: String, required: true },
  origin_description: { type: String, required: true },
  superpowers: { type: String, required: true },
  catch_phrase: { type: String, required: true },
  images: { type: [ImageSchema], required: true }
});

export default model('Hero', Hero);
