import express from "express";
import AuthController from "../api/controllers/auth/auth.controller";
import authUser from '../api/middlewares/auth.middleware';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/register', asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));
router.get('/verification/get-activation-email', authUser, asyncHandler(AuthController.getActivationEmail));
router.get('/verification/verify-account/:user_id/:token', asyncHandler(AuthController.verifyAccount));
router.post('/logout', authUser, asyncHandler(AuthController.logout));
router.get('/protected', authUser, asyncHandler(AuthController.authProtected));


export default router;