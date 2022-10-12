import { Router } from 'express';

import userRouter from './userRouter';

const Endpoints = Router();

Endpoints.use('/login', userRouter);

export default Endpoints;
