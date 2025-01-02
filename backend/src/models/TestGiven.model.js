import mongoose, { Schema } from "mongoose";

const testGivenSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    status: { 
        type: String, 
        enum: ['Not Started', 'In Progress', 'Completed'], 
        default: 'Not Started' 
    },
    score: { type: Number, default: 0 },
    submittedAt: { type: Date },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selectedOption: { type: Number }
    }],
    windowCount:{
        type:Number,
    }
});

export const TestGiven= mongoose.model('TestGiven', testGivenSchema);
