'use strict';

import { Model } from 'sequelize';
import { VoteInterface } from "../../interfaces/models/vote.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Vote extends Model<VoteInterface> implements VoteInterface {

    id!: number;
    type!: string;

    static associate(models: any) {
      Vote.belongsTo(models.User);
      Vote.belongsTo(models.Answer);
    }
  }

  Vote.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: {
          msg: "type is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};