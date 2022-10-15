import { Router } from 'express';
import userRouter from './userRouter';
import questionsRouter from './questionsRouter';

const Endpoints = Router();

Endpoints.use('/', userRouter);
Endpoints.use('/questions', questionsRouter);

export default Endpoints;
