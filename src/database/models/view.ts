'use strict';

import { Model } from 'sequelize';
import { ViewInterface } from "../../interfaces/models/view.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class View extends Model<ViewInterface> implements ViewInterface {

    id!: number;
    viewCount!: number;

    static associate(models: any) {
      View.belongsTo(models.Question);
    }
  }
  View.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'View',
  });
  return View;
};