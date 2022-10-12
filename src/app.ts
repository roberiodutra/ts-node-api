import express from "express";
import cors from 'cors';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes() {
    this.app.get('/', (req, res) => {
      return res.send('hellow world');
    });
  }
}

export default new App();
