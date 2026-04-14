const { Product } = require('../models');
const Joi = require('joi');
const { NotFoundError, ValidationError } = require('../errors/AppError');

class ProductService {
  constructor() {
    this.schema = Joi.object({
      name: Joi.string().min(2).required().messages({
        'string.min': 'name must be at least 2 characters',
        'any.required': 'name must be provided',
      }),
      brand: Joi.string().required().messages({
        'any.required': 'brand must be provided',
      }),
      price: Joi.number().positive().required().messages({
        'number.positive': 'price must be a positive number',
        'any.required': 'price must be provided',
      }),
      stock_quantity: Joi.number().integer().min(0).required().messages({
        'number.min': 'stock_quantity must be a non-negative number',
        'any.required': 'stock_quantity must be provided',
      }),
    });
  }

  async list({ page = 1, limit = 5 }) {
    const offset = (page - 1) * limit;
    const products = await Product.findAndCountAll({ limit, offset, order: [['id', 'ASC']] });
    return products;
  }

  async getById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  validatePayload(data) {
    const { error } = this.schema.validate(data, { abortEarly: false });
    if (error) {
      return error.details.map(detail => detail.message);
    }
    return [];
  }

  async create(data) {
    const errors = this.validatePayload(data);
    if (errors.length) {
      throw new ValidationError('Validation failed', errors);
    }

    const product = await Product.create(data);
    return product;
  }

  async update(id, data) {
    const product = await this.getById(id);
    const errors = this.validatePayload(data);
    if (errors.length) {
      throw new ValidationError('Validation failed', errors);
    }

    await product.update(data);
    return product;
  }

  async delete(id) {
    const product = await this.getById(id);
    await product.destroy();
    return;
  }
}

module.exports = new ProductService();