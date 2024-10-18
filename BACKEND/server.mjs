import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.mjs'; // Import routes

dotenv.config(); // Load environment variables

const app = express();


app.use(cors({
  origin: [
     'http://127.0.0.1:5173',// Local frontend during development
    // 'https://your-frontend-deployment-url.vercel.app' // Vercel frontend URL
  ],
  credentials: true
}));


app.use(express.json());

const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
