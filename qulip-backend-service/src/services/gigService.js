import { logger } from "../logger.js";
import Auth from "../models/authModel.js";
import Gig from "../models/gigModel.js"

const createGig = async (data) => {
    try {
        const {
            title,
            description,
            category,
            userId
        } = data;

        // Create a new gig instance
        const newGig = new Gig({
            title,
            description,
            category,
            userId
        });

        // Save the gig to the database
        const savedGig = await newGig.save();

        return savedGig;
    } catch (error) {
        // Log the error and throw it with a proper message
        logger.error(`Create Gig error: ${error.message}`);
        throw new Error(`Create Gig error: ${error.message}`);
    }
};

const getGigById = async (id) => {
    try {
        // Validate the ID parameter
        if (!id) {
            throw new Error('ID parameter is required.');
        }
        const gig = await Gig.findOne({ _id: id });

        return gig;
    } catch (error) {
        logger.error(`Get GigbyID() error: ${error.message}`);
        throw error;
    }
}

const getAllGigs = async () => {
    try {
        const gigs = await Gig.find().populate('userId');
        if (gigs.length === 0) {
            throw new Error(`No gigs found.`);
        }

        return gigs;
    } catch (error) {
        logger.error(`Get All Gigs error: ${error.message}`);
        throw new Error(`Get All Gigs error: ${error.message}`);
    }
};
const getUserDataAndGigs = async (userId) => {
    try {
        // Find the user by ID
        const user = await Auth.findById(userId);

        // If the user is not found, throw an error
        if (!user) {
            throw new Error(`User not found with ID: ${userId}`);
        }

        // Find gigs associated with the user
        const gigs = await Gig.find({ userId }).populate('userId');

        return { user, gigs };
    } catch (error) {
        // Log the error and throw it with a proper message
        logger.error(`Get User Data and Gigs error: ${error.message}`);
        throw new Error(`Get User Data and Gigs error: ${error.message}`);
    }
};

const updateGigById = async (id, data) => {
    try {
        if (!id) {
            throw new Error('ID parameter is required.');
        }

        if (!data) {
            throw new Error('Update data is required.');
        }
        const newGig = await Gig.findByIdAndUpdate(id, data, { new: true });
        return newGig;
    } catch (error) {
        logger.error(`Update Gig by ID error: ${error.message}`);
        throw error;
    }
}

const deleteGigById = async (gigId, retries = 3) => {
    try {
        const deletedGig = await Gig.findByIdAndDelete(gigId);
        if (!deletedGig) {
            throw new Error(`Gig not found`);
        }
        return deletedGig;
    } catch (error) {
        if (retries > 0) {
            logger.warn(`Retrying delete operation. Attempts remaining: ${retries}. Error: ${error.message}`);
            return deleteGigById(gigId, retries - 1);
        } else {
            logger.error(`Delete Gig by ID error: ${error.message}`);
            throw new Error(`Delete Gig by ID error: ${error.message}`);
        }
    }
};


export {
    createGig,
    getAllGigs,
    getGigById,
    getUserDataAndGigs,
    deleteGigById,
    updateGigById
}