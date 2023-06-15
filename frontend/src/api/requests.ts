import axios from 'axios';
import { Hero } from '../types/hero.type';

const BASE_URL = 'http://localhost:5000/heroes';

export const createNewHero = async (data: Hero) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = data;
  const request = {
    method: 'post',
    url: BASE_URL.concat('/createHero'),
    data: { nickname, real_name, origin_description, superpowers, catch_phrase, images },
  };
  const response = await axios(request);
  return response;
};

export const getHeroes = async (page: number) => {
  const request = {
    method: 'get',
    url: `${BASE_URL}/?page=${page}`
  };
  const response = await axios(request);
  return response;
};

export const getHeroById = async (id: string) => {
  const request = {
    method: 'get',
    url: BASE_URL.concat(`/${id}`),
  };
  const response = await axios(request);
  return response;
};

export const deleteHero = async (_id: string) => {
  const request = {
    method: 'delete',
    url: BASE_URL.concat('/deleteHero'),
    data: { _id }
  };
  const response = await axios(request);
  return response;
};

export const updateHero = async (data: Hero) => {
  const request = {
    method: 'put',
    url: BASE_URL.concat(`/updateHero/${data._id}`),
    data
  };
  const response = await axios(request);
  return response;
};
