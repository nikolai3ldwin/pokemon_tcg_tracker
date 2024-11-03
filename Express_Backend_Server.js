// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PokemonPriceService } from './services/priceService.js';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import cardRoutes from './routes/cards.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/users', userRoutes);

// Initialize price service
const priceService = new PokemonPriceService();

// Price fetching endpoint
app.get('/api/prices/:cardId', async (req, res) => {
  try {
    const cardData = await priceService.getComprehensiveCardData(req.params.cardId);
    res.json(cardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
