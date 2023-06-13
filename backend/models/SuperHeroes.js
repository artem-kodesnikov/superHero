import { Schema, model } from 'mongoose';

const Hero = new Schema({
  nickname: { type: String, required: true },
  real_name: { type: String, required: true },
  origin_description: { type: String, required: true },
  superpowers: { type: String, required: true },
  catch_phrase: { type: String, required: true },
  // images: {type: Buffer, required: true},
})

export default model('Hero', Hero)