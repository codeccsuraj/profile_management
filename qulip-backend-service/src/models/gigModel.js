import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Auth', // Replace 'Auth' with the name of your user model
        required: true 
    },
    category : {type : String, required : true},
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the model
const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
