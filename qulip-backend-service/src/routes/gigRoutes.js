import express from 'express';
import { addGig, deleteGig, getAllGigData, getGigFromId, getUserDataAndGigsController, updateGig } from '../controller/gigController.js';
import validateToken from '../middleware/validateToken.js';
const gigRoutes = express.Router();


gigRoutes.post('/posts',validateToken, addGig);
gigRoutes.get('/posts', getAllGigData);
gigRoutes.get('/posts/:id', getGigFromId);
gigRoutes.get('/gigs-doc/:userId', validateToken, getUserDataAndGigsController);
gigRoutes.delete('/posts/:id',validateToken, deleteGig);
gigRoutes.put('/posts/:id',validateToken, updateGig);

export default gigRoutes;