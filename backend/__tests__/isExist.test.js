import checkHeroExists from '../middlewares/isExist.middleware';
import Hero from '../models/SuperHeroes';
import { jest } from '@jest/globals'

describe('checkHeroExists middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should call next if hero exists', async () => {
    const heroId = 'heroId';
    const hero = { _id: heroId, name: 'Superman' };
    req.params.id = heroId;
    Hero.findById = jest.fn().mockResolvedValueOnce(hero);

    await checkHeroExists(req, res, next);

    expect(Hero.findById).toHaveBeenCalledWith(heroId);
    expect(req.hero).toEqual(hero);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 404 if hero does not exist', async () => {
    const heroId = 'heroId';
    req.params.id = heroId;
    Hero.findById = jest.fn().mockResolvedValueOnce(null);

    await checkHeroExists(req, res, next);

    expect(Hero.findById).toHaveBeenCalledWith(heroId);
    expect(req.hero).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Hero not found' });
  });

  it('should return 500 on server error', async () => {
    const heroId = 'heroId';
    req.params.id = heroId;
    Hero.findById = jest.fn().mockRejectedValueOnce(new Error('Server error'));

    await checkHeroExists(req, res, next);

    expect(Hero.findById).toHaveBeenCalledWith(heroId);
    expect(req.hero).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
});
