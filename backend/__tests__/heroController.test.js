import request from 'supertest';
import app from '../index.js';
import heroController from '../controllers/heroController'

describe('GET /heroes', () => {
  it('should return a list of heroes', async () => {
    const response = await request(app).get('/heroes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('posts');
    expect(response.body).toHaveProperty('totalHeroes');
  });

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