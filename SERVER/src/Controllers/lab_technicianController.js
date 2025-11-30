import LabTechnician from '../models/LabTechnician.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc    Get all lab technicians
// @route   GET /api/lab_technician
// @access  Private/Admin
export const getLabTechnicians = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single lab technician
// @route   GET /api/lab_technician/:id
// @access  Private/Admin
export const getLabTechnician = asyncHandler(async (req, res, next) => {
  const labTechnician = await LabTechnician.findById(req.params.id);

  if (!labTechnician) {
    return next(
      new ErrorResponse(`Lab technician not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: labTechnician });
});

// @desc    Create new lab technician
// @route   POST /api/lab_technician
// @access  Private/Admin
export const createLabTechnician = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const labTechnician = await LabTechnician.create(req.body);

  res.status(201).json({
    success: true,
    data: labTechnician
  });
});

// @desc    Update lab technician
// @route   PUT /api/lab_technician/:id
// @access  Private/Admin
export const updateLabTechnician = asyncHandler(async (req, res, next) => {
  let labTechnician = await LabTechnician.findById(req.params.id);

  if (!labTechnician) {
    return next(
      new ErrorResponse(`Lab technician not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is lab technician owner or admin
  if (labTechnician.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this lab technician`,
        401
      )
    );
  }

  labTechnician = await LabTechnician.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: labTechnician });
});

// @desc    Delete lab technician
// @route   DELETE /api/lab_technician/:id
// @access  Private/Admin
export const deleteLabTechnician = asyncHandler(async (req, res, next) => {
  const labTechnician = await LabTechnician.findById(req.params.id);

  if (!labTechnician) {
    return next(
      new ErrorResponse(`Lab technician not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is lab technician owner or admin
  if (labTechnician.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this lab technician`,
        401
      )
    );
  }

  await labTechnician.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Get current logged in lab technician
// @route   GET /api/lab_technician/profile
// @access  Private
export const getLabTechnicianProfile = asyncHandler(async (req, res, next) => {
  const labTechnician = await LabTechnician.findOne({ user: req.user.id });

  if (!labTechnician) {
    return next(
      new ErrorResponse(`No lab technician found for user ${req.user.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: labTechnician
  });
});

// @desc    Update lab technician profile
// @route   PUT /api/lab_technician/profile
// @access  Private
export const updateLabTechnicianProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    specialization: req.body.specialization,
    experience: req.body.experience,
    workingHours: req.body.workingHours
  };

  const labTechnician = await LabTechnician.findOneAndUpdate(
    { user: req.user.id },
    { $set: fieldsToUpdate },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: labTechnician
  });
});
