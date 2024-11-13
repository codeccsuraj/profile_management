import jwt from 'jsonwebtoken';
import { logger } from '../logger.js';
const validateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            })
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Ensure JWT_SECRET is set in your environment variables
        req.user = decoded;
        next(); // Attach the decoded payload to the request object
    } catch (error) {
        logger.error(`Token verification failed: ${error.message}`);
        res.status(400).json({
            success: false,
            message: 'Invalid token.',
        });
    }
};

export default validateToken;