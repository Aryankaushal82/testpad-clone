import mongoose, { Schema } from "mongoose";

const testSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim:true,
    },
    subject: { 
        type: String, 
        required: true,
        trim:true,
     },
    description: { 
        type: String,
        trim:true,
     },
    instructions: { 
        type: String,
        trim:true,
        lowercase:true,
     },
    totalMarks: { 
        type: Number, 
        required: true,
    },
    passingMarks: { 
        type: Number, 
        required: true
     },
    duration: { 
        type: Number, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true
     },
    endDate: { 
        type: Date, 
        required: true 
    },
    questions:[
        {
            questionText: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctOption: { type: Number, required: true },
            marks: { type: Number, required: true }
        },
    ],
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher' 
    },
},{timestamps: true});

export const Test = mongoose.model('Test', testSchema);
