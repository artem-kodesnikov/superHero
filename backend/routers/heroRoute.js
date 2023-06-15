import Router from 'express';
import controller from '../controllers/heroController.js';
import checkHeroExists from '../middlewares/isExist.middleware.js';
const router = new Router();

router.get('/', controller.getHeroes);
router.get('/:id', checkHeroExists, controller.getHeroById);
router.post('/createHero', controller.createHero);
router.delete('/deleteHero', checkHeroExists, controller.deleteHero);
router.put('/updateHero/:id', checkHeroExists, controller.updateHero);

export default router;
