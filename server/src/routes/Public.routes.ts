import express from 'express';

// Middelwares
import { Schemas, ValidateJoi } from '../middleware/Joi';

// Controllers
import controller from '../controllers/User';

const router = express.Router();

/** Register*/
router.post('/register', ValidateJoi(Schemas.user.create), controller.createUser);

/** Auth*/
router.post('/login', controller.login);

export = router;
