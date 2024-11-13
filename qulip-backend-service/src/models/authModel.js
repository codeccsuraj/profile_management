import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define schema for user authentication
const authSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Hash the password before saving the user
authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare provided password with hashed password
authSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

// Create the model
const Auth = mongoose.model('Auth', authSchema);

export default Auth;
