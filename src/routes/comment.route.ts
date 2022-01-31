import express from "express";
import CommentController from "../api/controllers/comment.controller";
import authUser from '../api/middlewares/auth.middleware';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/:commentId', asyncHandler(CommentController.show));
router.put('/:commentId', authUser, asyncHandler(CommentController.update));
router.delete('/:commentId', authUser, asyncHandler(CommentController.destroy));

export default router;