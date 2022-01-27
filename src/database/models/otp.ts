'use strict';

import { Model } from 'sequelize';

import { OtpInterface } from "../../interfaces/models/otp.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Otp extends Model<OtpInterface> implements OtpInterface {
    id!: number;
    email!: string;
    token!: string;
    expiresAt!: Date;

    static associate(models: any) {
      Otp.belongsTo(models.User);
    }
  }
  Otp.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,

    },
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};