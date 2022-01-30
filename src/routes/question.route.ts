import express from "express";
import QuestionController from "../api/controllers/question.controller";
import SubscriptionController from "../api/controllers/subscription.controller";
import authUser from '../api/middlewares/auth.middleware';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/', authUser, asyncHandler(QuestionController.create));
router.post('/:questionId/subscribe', authUser, asyncHandler(SubscriptionController.subscribe));


export default router;