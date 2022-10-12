import express from "express";
import cors from 'cors';
import Endpoints from './routes';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes() {
    this.app.use(Endpoints);
  }

  public start(PORT: string | number) {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default new App();
