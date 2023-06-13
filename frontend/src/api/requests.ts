import axios from "axios";
import { Hero } from "../types/hero.type";

const BASE_URL = 'http://localhost:3000'

export const createNewHero = async (data: Hero) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = data;
  const request = {
    method: 'post',
    url: BASE_URL.concat('/heroes/createHero'),
    data: { nickname, real_name, origin_description, superpowers, catch_phrase, images },
  };
  const response = await axios(request);
  return response;
};

export const getHeroes = async () => {
  const request = {
    method: 'get',
    url: BASE_URL.concat('/heroes/'),
  };
  const response = await axios(request);
  return response;
};
