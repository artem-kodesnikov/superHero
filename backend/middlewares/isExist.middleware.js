import Hero from '../models/SuperHeroes.js';

const checkHeroExists = async (req, res, next) => {
  try {
    let id;

    if (req.params.id) {
      id = req.params.id;
    }

    if (req.body.id) {
      id = req.body.id;
    }

    if (id) {
      const hero = await Hero.findById(id);
      if (hero) {
        req.hero = hero;
        next();
      } else {
        res.status(404).json({ message: 'Hero not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid id' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export default checkHeroExists;
