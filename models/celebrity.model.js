const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: { type: String },
  occupation: {
    type: String,
    enum: ['actor', 'singer', 'comedian', 'unknown']
  },
  catchPhrase: { type: String, required: true }
});

const Celebrity = mongoose.model('Celebritie', celebritySchema);

module.exports = Celebrity;
