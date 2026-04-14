const ProductService = require('../services/ProductService');

class ProductController {
  async index(req, res, next) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const products = await ProductService.list({ page: Number(page), limit: Number(limit) });
      return res.status(200).json({ success: true, data: products });
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const product = await ProductService.getById(req.params.id);
      return res.status(200).json({ success: true, data: product });
    } catch (err) {
      return next(err);
    }
  }

  async store(req, res, next) {
    try {
      const product = await ProductService.create(req.body);
      return res.status(201).json({ success: true, data: product });
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      return res.status(200).json({ success: true, data: product });
    } catch (err) {
      return next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      await ProductService.delete(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductController();
