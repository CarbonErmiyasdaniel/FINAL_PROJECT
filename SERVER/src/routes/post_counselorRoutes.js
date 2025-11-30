import express from 'express';
import { authProtect, authPostCounselor, authAdmin } from '../middleware/authMiddleware.js';
import {
  getPostCounselors,
  getPostCounselor,
  createPostCounselor,
  updatePostCounselor,
  deletePostCounselor,
  getPostCounselorProfile,
  updatePostCounselorProfile,
  getMyAppointments,
  getAppointmentStats
} from '../Controllers/post_counselorController.js';

const router = express.Router();

// Protected routes (authentication required)
router.use(authProtect);

// Post counselor can view and update their own profile
router.get('/profile', authPostCounselor, getPostCounselorProfile);
router.put('/profile', authPostCounselor, updatePostCounselorProfile);

// Post counselor can view their own appointments and stats
router.get('/my-appointments', authPostCounselor, getMyAppointments);
router.get('/appointment-stats', authPostCounselor, getAppointmentStats);

// Admin-only routes for managing all post counselors
router.use(authAdmin);

// Post counselor management routes
router
  .route('/')
  .get(getPostCounselors)
  .post(createPostCounselor);

router
  .route('/:id')
  .get(getPostCounselor)
  .put(updatePostCounselor)
  .delete(deletePostCounselor);

export default router;