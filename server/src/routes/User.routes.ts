import express from 'express';

// Middelwares
import { Schemas, ValidateJoi } from '../middleware/Joi';

// Controllers
import controller from '../controllers/User';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:userId', controller.readUser);

router.patch('/:userId', ValidateJoi(Schemas.user.update), controller.updateUser);
router.delete('/:userId', controller.deleteUser);

export = router;
