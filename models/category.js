'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    name: {
      
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "the category exists, please change to a different name"},
      validate:{
        notNull:{
          msg: 'Please enter a name.',
        },
        notEmpty:{
          msg: 'Can not be empty.',
        },
        len:{
          args: [2,45],
          msg: 'Has to be between 2 and 45 characters'
        }
      }
    
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      valid: {
        notEmpty: {msg: "ranking can not be empty"},
        notNull:{msg: "ranking can not be NULL"},
        isInt:{msg: 'ranking has to be an int'},
        isPositive(rankingNum){
          if (rankingNum < 0){
            throw new Error('ranking has to be a positive integer!')
          }
        }
      }

    }
  }, { 
    sequelize,
    modelName: 'Category',
  });
  return Category;
};