import Hero from '../models/SuperHeroes.js';

class heroController {
  async getHeroes(req, res) {
    try {
      const posts = await Hero.find();
      return res.status(200).send(posts);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Posts error' })
    }
  }

  async createHero(req, res) {
    try {
      const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
      const hero = new Hero({ nickname, real_name, origin_description, superpowers, catch_phrase });
      await hero.save();
      return res.status(201).send(hero);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Hero error' })
    }
  }

  async deleteHero(req, res) {
    try {
      const { _id } = req.body;
      const hero = await Hero.findByIdAndDelete(_id);
      return res.status(200).send(hero);
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Delete error' })
    }
  }

  async updateHero(req, res) {
    try {
      const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!hero) {
        return res.status(404).send('Hero is not found');
      }

      return res.status(200).send(hero);
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Delete error' })
    }
  }
}

export default new heroController();
