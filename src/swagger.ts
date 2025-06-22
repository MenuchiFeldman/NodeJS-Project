import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bulls and Cows API',
      version: '1.0.0',
      description: 'API documentation for your game project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/games/*.ts', './src/players/*.ts'], // Adjust paths as needed
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);