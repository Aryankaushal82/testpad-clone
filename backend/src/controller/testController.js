import { Test } from '../models/Test.model.js';
import mongoose from 'mongoose';

export const createTest = async (req, res) => {
    try {
        const {title,subject,totalMarks,passingMarks,duration,startDate,endDate,createdBy,questions} = req.body;
        if (
            !title || 
            !subject || 
            !totalMarks || 
            !passingMarks || 
            !duration || 
            !startDate || 
            !endDate || 
            !createdBy || 
            !questions?.length
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields. Please provide all necessary details.'
            });
        }
        const test = new Test({
            title,
            subject,
            description: req.body.description || '',
            instructions: req.body.instructions || '',
            totalMarks,
            passingMarks,
            duration,
            startDate,
            endDate,
            createdBy,
            questions
        });
        await test.save();

        return res.status(200).json({
            success: true,
            message: 'Test created successfully.',
            data: test
        });

    } catch (error) {
        console.error('Error creating test:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create test. Please try again later.'
        });
    }
};

export const getAllTests = async (req, res) => {
    try {
        const { subject, createdBy } = req.query;
        const filters = {};

        if (subject) filters.subject = subject;
        if (createdBy) filters.createdBy = createdBy;

        const tests = await Test.find(filters).select('title subject description totalMarks duration startDate endDate');
        if (!tests){
            return res.status(400).json({
                success: false,
                message: 'No tests found'
            })
        }
        return res.status(200).json({
            success: true,
            data: tests,
            count: tests.length
        });
    } catch (error) {
        console.error('Error fetching tests:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve tests. Please try again later.'
        });
    }
};

export const getTestById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid test ID format' });
        }
        const test = await Test.findById(req.params.id);

        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        return res.status(200).json({ success: true, data: test });
    } catch (error) {
        console.error('Error fetching test by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve the test. Please try again later.'
        });
    }
};

export const updateTest = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid test ID format' });
        }
        const updateData = { ...req.body };
        const allowedFields = ['title', 'subject', 'description', 'instructions', 'totalMarks', 'passingMarks', 'duration', 'startDate', 'endDate', 'questions'];
        Object.keys(updateData).forEach((key) => {
            if (!allowedFields.includes(key)) {
                delete updateData[key];
            }
        });
        const test = await Test.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        res.status(200).json({ success: true, data: test });
    } catch (error) {
        console.error('Error updating test:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update the test. Please try again later.'
        });
    }
};

export const deleteTest = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid test ID format' });
        }

        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }
        await test.remove();
        res.status(200).json({ success: true, message: 'Test deleted successfully' });

    } catch (error) {
        console.error('Error deleting test:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete the test. Please try again later.'
        });
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const { id, questionId } = req.params;
        const { questionText, options, correctOption, marks } = req.body;

        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({ 
                success: false, 
                message: 'Test not found.' 
            });
        }

        const question = test.questions.id(questionId);
        if (!question) {
            return res.status(404).json({ 
                success: false, 
                message: 'Question not found.' 
            });
        }
        if (questionText) question.questionText = questionText;
        if (Array.isArray(options)) question.options = options;
        if (correctOption !== undefined) question.correctOption = correctOption;
        if (marks !== undefined) question.marks = marks;

        await test.save();

        res.status(200).json({ 
            success: true, 
            message: 'Question updated successfully', 
            data: question 
        });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update question. Please try again later.' 
        });
    }
};

export const addQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionText, options, correctOption, marks } = req.body;
        if (!questionText || !Array.isArray(options) || options.length === 0 || correctOption === undefined || marks === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid input: questionText, options (non-empty array), correctOption, and marks are required.' 
            });
        }

        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({ 
                success: false, 
                message: 'Test not found.' 
            });
        }
        test.questions.push({ questionText, options, correctOption, marks });
        await test.save();

        res.status(201).json({ 
            success: true, 
            message: 'Question added successfully', 
            data: test.questions[test.questions.length - 1] 
        });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add question. Please try again later.' 
        });
    }
};

export const removeQuestion = async (req, res) => {
    try {
        const { id, questionId } = req.params;

        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({ 
                success: false, 
                message: 'Test not found.' 
            });
        }

        const questionIndex = test.questions.findIndex(q => q._id.toString() === questionId);
        if (questionIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Question not found.' 
            });
        }
        test.questions.splice(questionIndex, 1);
        await test.save();

        res.status(200).json({ 
            success: true, 
            message: 'Question removed successfully' 
        });
    } catch (error) {
        console.error('Error removing question:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to remove question. Please try again later.' 
        });
    }
};

