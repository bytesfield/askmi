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
      User.hasMany(models.Question);
      User.hasMany(models.Notification);
      User.hasMany(models.Answer);
      User.hasMany(models.Comment);
      User.hasMany(models.Vote);
      User.belongsToMany(models.Question, { through: "Subscribers" });
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
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstName is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastName is required"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: {
          msg: "email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required"
        }
      }
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