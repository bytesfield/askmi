'use strict';

import { Model } from 'sequelize';
import { SubscribersInterface } from "../../interfaces/models/subscribers.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Subscribers extends Model<SubscribersInterface> implements SubscribersInterface {

    QuestionId!: number;
    UserId!: number;

    static associate(models: any) {
      // define association here
    }
  }
  Subscribers.init({
    QuestionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,

    },
    UserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,

    },
  }, {
    sequelize,
    modelName: 'Subscribers',
  });
  return Subscribers;
};