import { Router } from 'express';

import userRouter from './userRouter';

const Endpoints = Router();

Endpoints.use('/', userRouter);

export default Endpoints;
