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
      images: [{ 'url': 'qwe' }, { 'url': 'qwe2' }]
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

describe('PUT /heroes/:id', () => {
  it('should update a hero', async () => {
    const heroId = 'hero_id';
    const updatedHero = {
      _id: heroId,
      nickname: 'Spider-Man',
      real_name: 'Peter Parker',
      origin_description: 'Bitten by a radioactive spider',
      superpowers: 'Agility, web-slinging, enhanced strength',
      catch_phrase: 'With great power comes great responsibility',
      images: [{ 'url': 'qwe' }, { 'url': 'qwe2' }]
    };

    Hero.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedHero);

    const response = await request(app).put(`/heroes/updateHero/${heroId}`).send(updatedHero);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedHero);

    expect(Hero.findByIdAndUpdate).toHaveBeenCalledWith(
      heroId,
      expect.objectContaining(updatedHero),
      expect.objectContaining({
        new: true,
        runValidators: true
      })
    );
  });

  it('should handle errors when updating a hero', async () => {
    const heroId = 'hero-id-123';
    const error = new Error('Internal Server Error');

    Hero.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
    console.error = jest.fn();

    const response = await request(app).put(`/heroes/updateHero/${heroId}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Delete error' });
  });
});
