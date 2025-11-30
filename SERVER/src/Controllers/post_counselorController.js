import PostCounselor from "../models/PostCounselor.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

// @desc    Get all post counselors
// @route   GET /api/post_counselor
// @access  Private/Admin
export const getPostCounselors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single post counselor
// @route   GET /api/post_counselor/:id
// @access  Private/Admin
export const getPostCounselor = asyncHandler(async (req, res, next) => {
  const postCounselor = await PostCounselor.findById(req.params.id);

  if (!postCounselor) {
    return next(
      new ErrorResponse(
        `Post counselor not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: postCounselor });
});

// @desc    Create new post counselor
// @route   POST /api/post_counselor
// @access  Private/Admin
export const createPostCounselor = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const postCounselor = await PostCounselor.create(req.body);

  res.status(201).json({
    success: true,
    data: postCounselor,
  });
});

// @desc    Update post counselor
// @route   PUT /api/post_counselor/:id
// @access  Private/Admin
export const updatePostCounselor = asyncHandler(async (req, res, next) => {
  let postCounselor = await PostCounselor.findById(req.params.id);

  if (!postCounselor) {
    return next(
      new ErrorResponse(
        `Post counselor not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is post counselor owner or admin
  if (
    postCounselor.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this post counselor`,
        401
      )
    );
  }

  postCounselor = await PostCounselor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: postCounselor });
});

// @desc    Delete post counselor
// @route   DELETE /api/post_counselor/:id
// @access  Private/Admin
export const deletePostCounselor = asyncHandler(async (req, res, next) => {
  const postCounselor = await PostCounselor.findById(req.params.id);

  if (!postCounselor) {
    return next(
      new ErrorResponse(
        `Post counselor not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is post counselor owner or admin
  if (
    postCounselor.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this post counselor`,
        401
      )
    );
  }

  await postCounselor.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Get current logged in post counselor
// @route   GET /api/post_counselor/profile
// @access  Private
export const getPostCounselorProfile = asyncHandler(async (req, res, next) => {
  const postCounselor = await PostCounselor.findOne({ user: req.user.id });

  if (!postCounselor) {
    return next(
      new ErrorResponse(`No post counselor found for user ${req.user.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: postCounselor,
  });
});

// @desc    Update post counselor profile
// @route   PUT /api/post_counselor/profile
// @access  Private
export const updatePostCounselorProfile = asyncHandler(
  async (req, res, next) => {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      specialization: req.body.specialization,
      experience: req.body.experience,
      workingHours: req.body.workingHours,
      languages: req.body.languages,
      bio: req.body.bio,
    };

    const postCounselor = await PostCounselor.findOneAndUpdate(
      { user: req.user.id },
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: postCounselor,
    });
  }
);

// @desc    Get logged in post counselor's appointments
// @route   GET /api/post_counselor/my-appointments
// @access  Private
export const getMyAppointments = asyncHandler(async (req, res, next) => {
  // This would typically query an appointments collection
  // For now, we'll return a placeholder response
  res.status(200).json({
    success: true,
    count: 0,
    data: [],
  });
});

// @desc    Get appointment statistics
// @route   GET /api/post_counselor/appointment-stats
// @access  Private
export const getAppointmentStats = asyncHandler(async (req, res, next) => {
  // This would typically aggregate appointment data
  // For now, we'll return a placeholder response
  res.status(200).json({
    success: true,
    data: {
      totalAppointments: 0,
      completed: 0,
      pending: 0,
      cancelled: 0,
      averageRating: 0,
    },
  });
});
