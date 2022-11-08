import express from "express";
import 'express-async-errors';
import cors from 'cors';
import Endpoints from './routes';
import connectToDatabase from "./database/models/connection";
import ErrorHandler from "./middlewares/ErrorHandler";
import swaggerServer from '../docs/swagger';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.config();
    this.database();
    this.routes();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private database() {
    connectToDatabase();
  }

  private routes() {
    this.app.use(Endpoints);
    this.app.use('/docs', ...swaggerServer);
    this.app.use(ErrorHandler);
  }

  public start(PORT: string | number) {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default new App();
