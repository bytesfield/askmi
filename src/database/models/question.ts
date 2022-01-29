'use strict';

import { Model } from 'sequelize';
import { QuestionInterface } from "../../interfaces/models/question.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Question extends Model<QuestionInterface> implements QuestionInterface {
    id!: number;
    title!: string;
    slug!: string;
    body!: string;
    isAnswered!: boolean;

    static associate(models: any) {
      Question.belongsTo(models.User);
      Question.hasMany(models.Answer);
      Question.hasMany(models.View);
      Question.belongsToMany(models.Tag, { through: "QuestionTags" });
      Question.belongsToMany(models.User, { through: "Subscribers" });
    }
  }
  Question.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title is required"
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "slug is required"
        }
      }
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
    isAnswered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};