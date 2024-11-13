import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { logger } from './logger.js';
import connection from './connection/connection.js';
import authRoutes from './routes/authRoutes.js';
import corsConfig from './config/corsConfig.js';
import gigRoutes from './routes/gigRoutes.js';

dotenv.config();

const app = express();

// Middleware to parse URL-encoded data
app.use(corsConfig);
// Middleware to parse JSON data
app.use(express.json());
app.use('/api', authRoutes)
app.use('/api', gigRoutes);
try {
    await connection(); // Ensure your connection is an async function that returns a Promise
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    server.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
        logger.error(`Server error: ${err.message}`);
        process.exit(1); // Exit process with failure
    });
} catch (error) {
    logger.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1); // Exit process with failure
}
