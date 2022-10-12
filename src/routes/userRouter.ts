import { Router } from 'express';
import UserController from '../controllers/userController';

const route = Router();

route.post('/', UserController.create);
route.get('/', UserController.read);
route.get('/:id', UserController.readOne);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.delete);

export default route;
