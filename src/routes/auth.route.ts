import express from "express";
import AuthController from "../api/controllers/auth/auth.controller";
import verifyJwtToken from '../api/middlewares/VerifyJwtToken';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/register', asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));
router.get('/verification/get-activation-email', verifyJwtToken, asyncHandler(AuthController.getActivationEmail));
router.get('/verification/verify-account/:user_id/:token', asyncHandler(AuthController.verifyAccount));
router.post('/logout', verifyJwtToken, asyncHandler(AuthController.logout));




export default router;