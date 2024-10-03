const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to a User collection
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String, // URL of the profile picture
  },
  accountCreated: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  savedHacks: [
    {
      hackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hack', // Reference to a Hack collection
      },
      dateSaved: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  activityLog: [
    {
      action: {
        type: String, // E.g., "viewed hack", "liked hack"
      },
      date: {
        type: Date,
        default: Date.now,
      },
      hackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hack', // Reference to a Hack collection
      },
    },
  ],
  subscription: {
    plan: {
      type: String, // E.g., "free", "premium"
    },
    renewalDate: {
      type: Date,
    },
  },
  notificationPreferences: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    inAppNotifications: {
      type: Boolean,
      default: true,
    },
  },
  privacySettings: {
    profileVisibility: {
      type: String, // E.g., "public", "friends only", "private"
      default: 'public',
    },
  },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
