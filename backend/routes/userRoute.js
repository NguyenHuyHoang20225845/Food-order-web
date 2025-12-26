import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
// Friendly handler for accidental GET requests (e.g., opening the URL in a browser)
userRouter.get('/register', (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Use POST /api/user/register to create an account.',
  });
});

userRouter.post('/login', loginUser);
userRouter.get('/login', (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Use POST /api/user/login to sign in.',
  });
});

export default userRouter;
