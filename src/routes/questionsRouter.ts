import { Router } from 'express';
import questionController from '../domain/cases/questions/controllers/questionController';

const route = Router();


route.post('/', questionController.create);
route.get('/', questionController.read);
route.get('/:id', questionController.readOne);
route.put('/:id', questionController.update);
route.delete('/:id', questionController.delete);

export default route;
