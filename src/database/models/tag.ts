'use strict';

import { Model } from 'sequelize';
import { TagInterface } from "../../interfaces/models/tag.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Tag extends Model<TagInterface> implements TagInterface {

    id!: number;
    name!: string;
    description!: string;

    static associate(models: any) {
      Tag.belongsToMany(models.Question, { through: "QuestionTags" });
    }
  }
  Tag.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: {
          msg: "name is required"
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};