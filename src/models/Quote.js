const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const quoteSchema = new Schema({
  version: Number,
  author_first_name: String,
  author_last_name: String,
  category: Number,
  comment: String,
  graphic_url: String,
  last_updated: Date,
  quote_format: Number,
  quote_string: String,
  source: String,
});

quoteSchema.pre('save', function (next) {
  this.last_updated = new Date();
  next();
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
