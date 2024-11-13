import express from 'express';
import { getUserList, getUsersList, loginUser, registerUser, updatePassword, updateUsers } from '../controller/authController.js';

const authRoutes= express.Router();

// Register a new user
authRoutes.post('/register', registerUser);

// Login a user
authRoutes.post('/login', loginUser);

// forgot password
authRoutes.post('/forgot-password', updatePassword);

authRoutes.get('/get-user/:id', getUserList);
authRoutes.get('/get-users', getUsersList);
authRoutes.put('/users/:id', updateUsers);


export default authRoutes;
