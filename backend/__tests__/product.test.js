const request = require('supertest');

const app = require('../src/app')
const { Product } = require('../src/app/models');
const truncate = require('./utils/truncate');


describe("Routes Products", () => {
    beforeEach(async () => {
        await truncate();
    });
});

describe("Product Integration Tests", () => {
    it("Should response the GET method", async () => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200);
    });

    it("POST /products - It responds with the new product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Amortecedor Dianteiro",
                brand: "Cofap",
                price: 350.50,
                stock_quantity: 10
            });

        expect(response.body.data).toHaveProperty("id");
        expect(response.statusCode).toBe(201);
    });

    it("GET /products - Should return a list of products", async () => {
        await Product.create({ name: "Filtro de Óleo", brand: "Fram", price: 25.00, stock_quantity: 50 });
        
        const response = await request(app)
            .get("/products");

        expect(response.body.data.count).toBeGreaterThanOrEqual(1);
        expect(response.statusCode).toBe(200);
    });

    it('GET /products/:id - should show a specific product', async () => {
        const product = await Product.create({ name: "Pastilha de Freio", brand: "Fras-le", price: 120.00, stock_quantity: 20 });

        const res = await request(app)
            .get(`/products/${product.id}`);

        expect(res.body.data).toHaveProperty('id', product.id);
        expect(res.statusCode).toBe(200);
    });

    it("PUT /products/:id - Should update a specific product", async () => {
        const product = await Product.create({ name: "Vela de Ignição", brand: "NGK", price: 15.00, stock_quantity: 100 });

        const response = await request(app)
            .put(`/products/${product.id}`)
            .send({
                name: "Vela de Ignição Iridium",
                brand: "NGK",
                price: 45.00,
                stock_quantity: 80
            });
        expect(response.body.data).toHaveProperty('name', 'Vela de Ignição Iridium');
        expect(response.statusCode).toBe(200);
    });

    it("POST /products - Should return 400 if validation fails", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "A", // Curto demais
                brand: "",
                price: -10
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toBeDefined();
    });

    it('DELETE /products/:id - delete a specific product', async () => {
        const product = await Product.create({ name: "Pneu 175/70 R14", brand: "Pirelli", price: 320.00, stock_quantity: 4 });

        const response = await request(app)
            .delete(`/products/${product.id}`);

        expect(response.status).toBe(204);
    });
});
