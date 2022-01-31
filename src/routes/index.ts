import express, { Response, Request, NextFunction } from 'express';
import { success } from '../api/responses';
import authRoutes from './auth.route';
import questionRoutes from './question.route';
import answerRoutes from './answer.route';
import commentRoutes from './comment.route';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/questions', questionRoutes);
router.use('/api/answers', answerRoutes);
router.use('/api/comments', commentRoutes);

router.get('/', (request: Request, response: Response) => {
    return success(response, 'KoraPay Test API v1.');
});

export default router;