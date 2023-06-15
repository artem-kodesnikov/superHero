import request from 'supertest';
import app from '../index.js';
import heroController from '../controllers/heroController';
import Hero from '../models/SuperHeroes'

describe('GET /heroes', () => {
  it('should return a list of heroes', async () => {
    const response = await request(app).get('/heroes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('posts');
    expect(response.body).toHaveProperty('totalHeroes');
  }, 10000);

  it('should handle errors', async () => {
    heroController.getHeroes = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    try {
      const response = await request(app).get('/heroes');
      expect(response.status).toBe(200);
    } catch (error) {
      expect(error.message).toBe('Internal Server Error');
    }
  });
});

describe('Get /heroes/:id', () => {
  it('should get a hero by ID', async () => {
    const mockHero = {
      _id: 'hero_id',
      name: 'Superman',
      catch_phrase: 'Up, up and away!',
    };

    Hero.findById = jest.fn().mockResolvedValue(mockHero);

    const response = await request(app).get('/heroes/hero_id');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHero);
  });
});

describe('POST /heroes', () => {
  it('should create a new hero', async () => {
    const newHero = {
      nickname: 'Spider-Man',
      real_name: 'Peter Parker',
      origin_description: 'Bitten by a radioactive spider',
      superpowers: 'Agility, web-slinging, enhanced strength',
      catch_phrase: 'With great power comes great responsibility',
      images: [{'url': 'qwe'}, {'url': 'qwe2'}]
    };

    Hero.prototype.save = jest.fn().mockResolvedValue(newHero);

    const response = await request(app).post('/heroes/createHero').send(newHero);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newHero);

    expect(Hero.prototype.save).toHaveBeenCalledWith();

    const createdHero = await Hero.findOne({ nickname: newHero.nickname });
    expect(createdHero).toBeFalsy();
  });
});
