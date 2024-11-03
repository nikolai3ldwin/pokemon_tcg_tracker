// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
});

export const User = mongoose.model('User', userSchema);

// models/Card.js
const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  set: { type: String, required: true },
  condition: { type: String, required: true },
  rarity: { type: String, required: true },
  imageUrl: String,
  priceHistory: [{
    date: Date,
    price: Number,
    source: String
  }],
  lastUpdated: Date
});

export const Card = mongoose.model('Card', cardSchema);

// models/Listing.js
const listingSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  price: Number,
  condition: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

export const Listing = mongoose.model('Listing', listingSchema);
