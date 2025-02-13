import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'], // Valid values
        required: true
    },
    type: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    impact: {
        type: String,
        required: true
    },
    affected_system: {
        type: String,
        required: true
    },
    poc: { type: Buffer, ref: 'GridFSBucket' },  // Reference to GridFS file
}, { timestamps: true }); 

export const reports = mongoose.model("reports", schema);
