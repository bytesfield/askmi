'use strict';

import { Model } from 'sequelize';
import { AnswerInterface } from "../../interfaces/models/answer.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Answer extends Model<AnswerInterface> implements AnswerInterface {

    id!: number;
    body!: string;
    isFirst!: boolean;
    isBest!: boolean;

    static associate(models: any) {
      Answer.belongsTo(models.Question);
      Answer.belongsTo(models.User);
      Answer.hasMany(models.Comment);
      Answer.hasMany(models.Vote);
    }
  }
  Answer.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "body is required"
        }
      }
    },
    isFirst: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBest: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};