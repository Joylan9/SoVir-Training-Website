import express from 'express';
import { protect } from '../middlewares/auth.middleware';
import { enrollStudent, getPendingEnrollments, acceptEnrollment, rejectEnrollment } from '../controllers/enrollment.controller';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

router.post('/enroll', enrollStudent);
router.get('/pending', getPendingEnrollments);
router.post('/accept', acceptEnrollment);
router.post('/reject', rejectEnrollment);

export default router;
