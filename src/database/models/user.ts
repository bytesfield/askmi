'use strict';

import { Model } from 'sequelize';

import { UserInterface } from "../../interfaces/models/user.interface";


module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInterface> implements UserInterface {

    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    email!: string;
    password!: string;
    emailVerifiedAt!: Date;

    static associate(models: any) {
      User.hasOne(models.Otp);
      // define association here
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true

    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};