"use strict";


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    brand: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    },
    stock_quantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('products'),
};