import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:userId', controller.readUser);
router.post('/', ValidateJoi(Schemas.user.create), controller.createUser);
router.patch('/:userId', ValidateJoi(Schemas.user.update), controller.updateUser);
router.delete('/:userId', controller.deleteUser);

export = router;
