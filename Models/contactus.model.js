import mongoose from "mongoose";


const ContactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    company_name: {
        type: String,
        required: true, 
        trim: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], 
    },
    contact: {
        type: String,
        required: true, 
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], 
    },
    message: {
        type: String,
        required: true, 
        minlength: 10,
    },
}, {
    timestamps: true,
});

export const contacts = mongoose.model("contacts", ContactUsSchema);
