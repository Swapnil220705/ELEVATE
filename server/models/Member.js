import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  year: {
    type: String,
    required: [true, 'Academic year is required'],
    enum: ['1st', '2nd', '3rd', '4th', 'graduate']
  },
  interests: [{
    type: String,
    enum: [
      'Web Development',
      'Mobile Development', 
      'AI/Machine Learning',
      'Data Science',
      'Blockchain',
      'IoT',
      'Cybersecurity',
      'Game Development',
      'DevOps',
      'UI/UX Design'
    ]
  }],
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'beginner'
  },
  motivation: {
    type: String,
    required: [true, 'Motivation is required'],
    maxlength: [1000, 'Motivation cannot exceed 1000 characters']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  github: {
    type: String,
    trim: true,
    match: [/^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/, 'Please enter a valid GitHub URL']
  },
  linkedin: {
    type: String,
    trim: true,
    match: [/^https:\/\/linkedin\.com\/in\/[a-zA-Z0-9_-]+$/, 'Please enter a valid LinkedIn URL']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
memberSchema.index({ email: 1 });
memberSchema.index({ status: 1 });
memberSchema.index({ interests: 1 });

// Virtual for member's full profile
memberSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    year: this.year,
    interests: this.interests,
    experience: this.experience,
    status: this.status,
    joinedAt: this.joinedAt
  };
});

const Member = mongoose.model('Member', memberSchema);
export default Member;