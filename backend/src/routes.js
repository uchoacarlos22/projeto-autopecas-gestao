const { Router } = require('express');
const ProductController = require('./app/controllers/ProductController');

const routes = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Hello message
 */
routes.get('/', (req, res) => {
  res.send('<h1>Hello! Welcome to my PRODUCT_API NodeJS-MYSQL<h1>');
});

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: API Status
 */
routes.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

// -- Rotas Produtos RESTful --//

/**
 * @openapi
 * /products:
 *   get:
 *     summary: List all products with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: List of products
 */
routes.get('/products', ProductController.index);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 */
routes.get('/products/:id', ProductController.show);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation failed
 */
routes.post('/products', ProductController.store);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Product not found
 */
routes.put('/products/:id', ProductController.update);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
routes.delete('/products/:id', ProductController.destroy);

module.exports = routes;