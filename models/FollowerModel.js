const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
  },
});
followerSchema.index({ company: 1, user: 1 }, { unique: true });

const Follower = mongoose.model('Follower', followerSchema);

module.exports = Follower;
