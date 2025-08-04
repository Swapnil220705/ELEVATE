import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Event image is required']
  },
  category: {
    type: String,
    enum: ['workshop', 'hackathon', 'seminar', 'competition', 'networking', 'other'],
    default: 'workshop'
  },
  tags: [{
    type: String,
    trim: true
  }],
  maxAttendees: {
    type: Number,
    min: 1,
    max: 1000
  },
  registeredAttendees: [{
    name: String,
    email: String,
    registeredAt: { type: Date, default: Date.now }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  registrationDeadline: {
    type: Date
  },
  organizer: {
    name: String,
    email: String,
    phone: String
  }
}, {
  timestamps: true
});

// Virtual for attendee count
eventSchema.virtual('attendeeCount').get(function() {
  return this.registeredAttendees.length;
});

// Virtual for registration status
eventSchema.virtual('isRegistrationOpen').get(function() {
  const now = new Date();
  const deadline = this.registrationDeadline || this.date;
  return now < deadline && this.isActive;
});

// Index for faster queries
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isActive: 1 });

const Event = mongoose.model('Event', eventSchema);
export default Event;