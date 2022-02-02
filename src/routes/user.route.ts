import express from "express";
import UserController from "../api/controllers/user.controller";
import authUser from '../api/middlewares/auth.middleware';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/profile', authUser, asyncHandler(UserController.profile));
router.get('/notifications', authUser, asyncHandler(UserController.notification));

router.post('/notifications/:notificationId/read', authUser, asyncHandler(UserController.markNotificationAsRead));

export default router;