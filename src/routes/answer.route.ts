import express from "express";
import AnswerController from "../api/controllers/answer.controller";
import CommentController from "../api/controllers/comment.controller";
import authUser from '../api/middlewares/auth.middleware';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/:answerId', asyncHandler(AnswerController.show));
router.put('/:answerId', authUser, asyncHandler(AnswerController.update));
router.delete('/:answerId', authUser, asyncHandler(AnswerController.destroy));

router.post('/:answerId/comments', authUser, asyncHandler(CommentController.create));
router.get('/:answerId/comments', asyncHandler(CommentController.index));



export default router;