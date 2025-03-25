const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Sigma.st Painel IPTV API',
    description: 'API Simples para gerenciar o Sigma Painel IPTV'
  },
  host: 'localhost:3131'
};

const outputFile = './swagger.json';
const routes = ['./dist/routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
