const { Model, DataTypes } = require('sequelize');
const slugify = require('slugify');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init({
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  unit_price: DataTypes.FLOAT,
  image_url: DataTypes.STRING,
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  category_id: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Product',
  hooks: {
    beforeCreate: (product) => {
      product.slug = slugify(product.name, { lower: true });
    },
    beforeUpdate: (product) => {
      product.slug = slugify(product.name, { lower: true });
    }
  }
});

module.exports = Product;
