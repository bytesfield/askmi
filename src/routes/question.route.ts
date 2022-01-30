import express from "express";
import QuestionController from "../api/controllers/question.controller";
import AnswerController from "../api/controllers/answer.controller";
import SubscriptionController from "../api/controllers/subscription.controller";
import authUser from '../api/middlewares/auth.middleware';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/', authUser, asyncHandler(QuestionController.create));
router.get('/', asyncHandler(QuestionController.index));
router.delete('/:questionId', authUser, asyncHandler(QuestionController.destroy));
router.get('/:questionId', asyncHandler(QuestionController.find));
router.put('/:questionId', asyncHandler(QuestionController.update));
router.post('/:questionId/subscribe', authUser, asyncHandler(SubscriptionController.subscribe));
router.post('/:questionId/unsubscribe', authUser, asyncHandler(SubscriptionController.unSubscribe));

router.post('/:questionId/answers', authUser, asyncHandler(AnswerController.create));
router.get('/:questionId/answers', asyncHandler(AnswerController.index));



export default router;