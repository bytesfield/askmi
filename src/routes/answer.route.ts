import express from "express";
import AnswerController from "../api/controllers/answer.controller";
import authUser from '../api/middlewares/auth.middleware';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/:answerId', asyncHandler(AnswerController.show));
router.put('/:answerId', authUser, asyncHandler(AnswerController.update));
router.delete('/:answerId', authUser, asyncHandler(AnswerController.destroy));



export default router;