import express from "express";
import QuestionController from "../api/controllers/question.controller";
import verifyJwtToken from '../api/middlewares/VerifyJwtToken';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/', verifyJwtToken, asyncHandler(QuestionController.create));


export default router;