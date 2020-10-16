import { Router } from 'express';
import userRoutes from './userRoute';

const router = Router();
router.use('/api', userRoutes);

export default router;
