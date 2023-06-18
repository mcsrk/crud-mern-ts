import express from 'express';
import controller from '../controllers/Order';

// Middlewares
import { Schemas, ValidateJoi } from '../middleware/Joi';
import { CheckOrderStatus } from '../middleware/CheckOrderStatus';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:orderId', controller.readOrder);

router.post('/', ValidateJoi(Schemas.order.create), controller.createOrder);
router.post('/:orderId/complete', controller.completeOrder);
router.patch('/:orderId', CheckOrderStatus, ValidateJoi(Schemas.order.update), controller.updateOrder);
router.delete('/:orderId', CheckOrderStatus, controller.deleteOrder);

router.post('/:orderId/products', CheckOrderStatus, ValidateJoi(Schemas.product.create), controller.addProduct);
router.delete('/:orderId/products/:productId', CheckOrderStatus, controller.deleteProduct);

export = router;
