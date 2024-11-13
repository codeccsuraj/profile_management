import { logger } from '../logger.js';
import { authenticateUser, createUser, forgotPassword, getUserByID, getUsers, updateUserById } from '../services/authService.js';

// Handle user registration
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;

    try {
        // Create the user using the service function
        const user = await createUser({ firstName, lastName, email, mobile, password });

        // Send a success response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                createdAt: user.createdAt,
            },
        });

        logger.info(`User registered: ${user.email}`);
    } catch (error) {
        if (error.message.includes('E11000')) {
            // Handle duplicate key error (e.g., email already exists)
            res.status(400).json({
                message: 'User with same email or mobile already exists',
                error: error.message,
            });
        } else {
            // Handle other registration errors
            res.status(400).json({
                message: 'User registration failed',
                error: error.message,
            });
        }

        logger.error(`Registration error: ${error.message}`);
    }
};

// Handle user login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Authenticate the user using the service function
        const { user, token } = await authenticateUser(email, password);

        // Send a success response with the token
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                createdAt: user.createdAt,
            },
            userToken: token,
        });

        logger.info(`User logged in: ${user.email}`);
    } catch (error) {
        // Send an error response
        res.status(401).json({
            message: 'Login failed',
            error: error.message,
        });

        logger.error(`Login error: ${error.message}`);
    }
};

export const updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await forgotPassword(email, password);
        res.status(200).json({
            message: result.message,
        });

        logger.info(`Password reset initiated for email: ${email}`);
    } catch (error) {
        // Send an error response
        res.status(400).json({
            message: 'Password reset failed',
            error: error.message,
        });

        logger.error(`Forgot password error: ${error.message}`);
    }
};
export const getUsersList = async (req, res) => {
    try {
        const user = await getUsers();
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user,
        });
    } catch (error) {
        logger.error(`Error in getUserController: ${error.message}`);
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}
export const getUserList = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserByID(id);
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user,
        });
    } catch (error) {
        logger.error(`Error in getUserController: ${error.message}`);
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}
export const updateUsers = async (req, res) => {
    const { id } = req.params; // Get the user ID from URL parameters
    const data = req.body;      // Get the fields to update from the request body

    try {
        // Call the service function with the provided ID and data
        const updatedUser = await updateUserById(id, data);

        // Send a success response with the updated user data
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        // Log the error and send an error response
        logger.error(`Error in updateUserController: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
