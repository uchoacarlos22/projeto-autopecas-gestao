const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RM auto peças API',
      version: '1.0.0',
      description: 'API corporativa para gerenciamento de estoque de peças automotivas e logística.',
      contact: {
        name: 'Suporte Técnico',
        email: 'suporte@rmautopecas.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de Desenvolvimento Local',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'brand', 'price', 'stock_quantity'],
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Amortecedor Dianteiro' },
            brand: { type: 'string', example: 'Cofap' },
            price: { type: 'number', format: 'float', example: 350.50 },
            stock_quantity: { type: 'integer', example: 10 },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          }
        }
      }
    }
  },
  apis: ['./src/routes.js', './src/app/controllers/*.js'],
};

module.exports = swaggerJSDoc(options);
