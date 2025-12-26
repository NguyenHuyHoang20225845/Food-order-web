import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'

import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import itemRouter from './routes/itemRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE 
const allowedOrigins = [
  // Preferred: configure via env for flexibility across deployments
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  // Known production origins
  "https://foodie-frenzy-frontend-eone.onrender.com",
  "https://foodie-frenzy-admin.onrender.com",
  // Local development convenience
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://localhost:4173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        console.log('Allowed origins:', allowedOrigins);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB CONNECT
connectDB();
console.log("Stripe Key Loaded:", !!process.env.STRIPE_SECRET_KEY);


// Routes
app.use('/api/user', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/cart', cartRouter)
app.use('/api/items', itemRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})