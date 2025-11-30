import mongoose from 'mongoose';

const PostCounselorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  specialization: {
    type: String,
    required: [true, 'Please add specialization'],
    enum: [
      'Mental Health',
      'Trauma',
      'Addiction',
      'Family',
      'Grief',
      'Other'
    ]
  },
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative'],
    default: 0
  },
  workingHours: {
    start: {
      type: String,
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use 24-hour format (HH:MM)']
    },
    end: {
      type: String,
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use 24-hour format (HH:MM)']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  languages: [{
    type: String,
    trim: true
  }],
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure one user has only one post counselor profile
PostCounselorSchema.index({ user: 1 }, { unique: true });

// Static method to get the average experience of all post counselors
PostCounselorSchema.statics.getAverageExperience = async function() {
  const obj = await this.aggregate([
    {
      $group: {
        _id: null,
        averageExperience: { $avg: '$experience' }
      }
    }
  ]);

  try {
    await this.model('PostCounselorStats').findOneAndUpdate(
      {},
      {
        averageExperience: obj[0] ? Math.ceil(obj[0].averageExperience) : 0
      },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageExperience after save
PostCounselorSchema.post('save', function() {
  this.constructor.getAverageExperience();
});

// Call getAverageExperience before remove
PostCounselorSchema.pre('remove', function() {
  this.constructor.getAverageExperience();
});

// Create a model from the schema
export default mongoose.model('PostCounselor', PostCounselorSchema);
