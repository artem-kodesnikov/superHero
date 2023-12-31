import Hero from '../models/SuperHeroes.js';

class heroController {
  async getHeroes(req, res) {
    const page = parseInt(req.query && req.query.page, 10) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    try {
      const posts = await Hero.find().sort({ _id: 'desc' }).skip(skip).limit(limit);
      const totalHeroes = await Hero.countDocuments();
      return res.status(200).send({ posts, totalHeroes });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Hero error' })
    }
  }

  async getHeroById(req, res) {
    try {
      const heroId = req.hero._id
      const hero = await Hero.findById(heroId);

      return res.status(200).send(hero);
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Hero error' })
    }
  }

  async createHero(req, res) {
    try {
      const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = req.body;
      const hero = new Hero({ nickname, real_name, origin_description, superpowers, catch_phrase, images });
      await hero.save();
      return res.status(201).send(hero);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Hero error' })
    }
  }

  async deleteHero(req, res) {
    try {
      const heroId = req.hero._id
      const hero = await Hero.findByIdAndDelete(heroId);
      return res.status(200).send(hero);
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Delete error' })
    }
  }

  async updateHero(req, res) {
    try {
      const heroId = req.hero._id
      const hero = await Hero.findByIdAndUpdate(heroId, req.body, {
        new: true,
        runValidators: true
      });

      return res.status(200).send(hero);
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Delete error' })
    }
  }
}

export default new heroController();
