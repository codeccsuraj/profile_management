import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {logger} from '../logger.js';

dotenv.config();

const connection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}backend`, {
           
        });
        logger.info("database connected successfully")
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}

export default connection;