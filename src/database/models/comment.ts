'use strict';

import { Model } from 'sequelize';
import { CommentInterface } from "../../interfaces/models/comment.interface";

module.exports = (sequelize: any, DataTypes: any) => {
  class Comment extends Model<CommentInterface> implements CommentInterface {

    id!: number;
    body!: string;

    static associate(models: any) {
      Comment.belongsTo(models.User);
      Comment.belongsTo(models.Answer);
    }
  }
  Comment.init({
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
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};