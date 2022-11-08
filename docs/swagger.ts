import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Swagger TS-Node - API',
    version: '1.0.0',
    description: `Documentation for TS-Node api
      - Frontend for this:
        [TS-React-APP](https://github.com/swagger-api/swagger-petstore)`,
    contact: { email: 'dev.roberio@gmail.com' }
  },
  host: 'localhost:3001',
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./docs/**/*.yaml'],
};

const swaggerServer = [swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options))];

export default swaggerServer;
