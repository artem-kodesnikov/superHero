import Router from 'express';
import controller from '../controllers/heroController.js';
const router = new Router();

router.get('/', controller.getHeroes);
router.post('/createHero', controller.createHero);
router.delete('/deleteHero', controller.deleteHero);
router.put('/updateHero/:id', controller.updateHero);

export default router;