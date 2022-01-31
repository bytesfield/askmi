'use strict';

import { Model } from 'sequelize';
import { NotificationInterface } from "../../interfaces/models/notification.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Notification extends Model<NotificationInterface> implements NotificationInterface {

    id!: number;
    title!: string;
    content!: string;
    isRead!: boolean;

    static associate(models: any) {
      Notification.belongsTo(models.User);
    }
  }
  Notification.init({
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "content is required"
        }
      }
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};