import express from 'express';
import controller from '../controllers/Order';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:orderId', controller.readOrder);
router.post('/', ValidateJoi(Schemas.order.create), controller.createOrder);
router.patch('/:orderId', ValidateJoi(Schemas.order.update), controller.updateOrder);
router.delete('/:orderId', controller.deleteOrder);

router.post('/:orderId/products', ValidateJoi(Schemas.product.create), controller.addProduct);

export = router;
