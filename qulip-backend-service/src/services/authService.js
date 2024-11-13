import auth from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import { logger } from '../logger.js';
import bcrypt from 'bcrypt'
import { hashPassword } from '../utils/helper.js';

const createUser = async (data) => {
    try {
        const {
            firstName,
            lastName,
            mobile,
            email,
            password,
        } = data;

        const user = new auth({ firstName, lastName, email, mobile, password });
        await user.save();
        logger.info(`User created: ${user.email}`);
        return user;
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`);
    }
};

const authenticateUser = async (email, password) => {
    try {
        const user = await auth.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('invalid email or password')
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        logger.info(`User authenticated: ${user.email}`);
        return { user, token };
    } catch (error) {
        logger.error(`Authentication error: ${error.message}`);
        throw new Error(`Authentication error: ${error.message}`);
    }
};

const forgotPassword = async (email, newPassword) => {
    try {
        // Check if the user exists
        const checkUser = await auth.findOne({ email });

        if (!checkUser) {
            throw new Error('No user found with this email');
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);

        // Update the user's password
        checkUser.password = hashedPassword;
        await checkUser.save();

        logger.info(`Password reset successfully for user: ${checkUser.email}`);

        return { message: 'Password reset successfully' };
    } catch (error) {
        logger.error(`Forgot password error: ${error.message}`);
        throw new Error(`Forgot password error: ${error.message}`);
    }
};

const getUsers = async () => {
    try {
        const user = await auth.find({}).select("firstName lastName email mobile");
        if (!user || user.length === 0) {
            throw new Error("No users found");
        }
        logger.info(`Users retrieved: ${user.length} users found`);
        return user;
    } catch (error) {
        logger.error(`Error retrieving user by ID: ${error.message},`);
        throw new Error(`Error retrieving user by ID: ${error.message}`);
    }
}

const getUserByID = async (id) => {
    try {
        const user = await auth.findById(id);
        if (!user) {
            throw new Error("User not found Id");
        }
        logger.info(`User retrieved: ${user.email}`);
        return user;
    } catch (error) {
        logger.error(`Error retrieving user by ID: ${error.message},`);
        console.log("this is id", id)
        throw new Error(`Error retrieving user by ID: ${error.message}`);
    }
};

const updateUserById = async (id, data) => {
    try {
        const updateFields = {};
        // Checking the each field in data and adding it to updateFields if it exists
        if (data.firstName) updateFields.firstName = data.firstName;
        if (data.lastName) updateFields.lastName = data.lastName;
        if (data.email) updateFields.email = data.email;
        if (data.mobile) updateFields.mobile = data.mobile;
        // If the password is provided, hash it before updating
        if (data.password) {
            updateFields.password = await hashPassword(data.password);
        }

        // Update user document with the specified fields
        const updatedUser = await auth.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            throw new Error("User not found");
        }
        logger.info(`User updated: ${updatedUser.email}`);
        return updatedUser;
    } catch (error) {
        logger.error(`Error updating user: ${error.message}`);
        throw new Error(`Error updating user: ${error.message}`);
    }
}
export {
    createUser,
    authenticateUser,
    forgotPassword,
    getUserByID,
    getUsers,
    updateUserById
}