import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: 'Swagger TS-Node - API',
    version: '1.0.0',
    description: 'Documentation for TS-Node api',
  },
  host: 'localhost:3001',
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./docs/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
