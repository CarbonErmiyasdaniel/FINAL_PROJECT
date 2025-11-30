import express from 'express';
import { authProtect, authLabTechnician, authAdmin } from '../middleware/authMiddleware.js';
import {
  getLabTechnicians,
  getLabTechnician,
  createLabTechnician,
  updateLabTechnician,
  deleteLabTechnician,
  getLabTechnicianProfile,
  updateLabTechnicianProfile
} from '../Controllers/lab_technicianController.js';

const router = express.Router();

// Protected routes (authentication required)
router.use(authProtect);

// Lab technician can view and update their own profile
router.get('/profile', authLabTechnician, getLabTechnicianProfile);
router.put('/profile', authLabTechnician, updateLabTechnicianProfile);

// Admin-only routes for managing all lab technicians
router.use(authAdmin);

// Lab technician management routes
router
  .route('/')
  .get(getLabTechnicians)
  .post(createLabTechnician);

router
  .route('/:id')
  .get(getLabTechnician)
  .put(updateLabTechnician)
  .delete(deleteLabTechnician);

export default router;