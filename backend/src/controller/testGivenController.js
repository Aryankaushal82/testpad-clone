import { TestGiven } from '../models/TestGiven.model.js';
import { Test } from '../models/Test.model.js';


export const startTest = async (req, res) => {
    try {
        const { studentId, testId } = req.body;
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }
        let testAttempt = await TestGiven.findOne({ studentId, testId });
        if (testAttempt) {
            return res.status(400).json({ success: false, message: 'Test already started or completed' });
        }
        testAttempt = await TestGiven.create({
            studentId,
            testId,
            status: 'In Progress'
        });

        return res.status(201).json({ success: true, message: 'Test started successfully', data: testAttempt });
    } catch (error) {
        console.error('Error starting test:', error);
        return res.status(500).json({ success: false, message: 'Failed to start test' });
    }
};

export const submitTest = async (req, res) => {
    const { studentId, testId, answers, score } = req.body;

    try {
        const testAttempt = await TestGiven.findOne({ studentId, testId });

        if (!testAttempt) {
            return res.status(404).json({ success: false, message: 'Test attempt not found' });
        }
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        let totalScore = 0;
        answers.forEach((answer) => {
            const question = test.questions.find(q => q._id.toString() === answer.questionId.toString());

            if (question) {
                if (question.correctOption === answer.selectedOption) {
                    totalScore += question.marks;
                }
            }
        });
        testAttempt.score = totalScore;
        testAttempt.status = 'Completed';
        testAttempt.submittedAt = new Date();

        await testAttempt.save();

        return res.status(200).json({
            success: true,
            message: 'Test submitted successfully',
            score: totalScore,
            data: testAttempt
        });

    } catch (error) {
        console.error('Error submitting test:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while submitting the test'
        });
    }
};

export const updateTestAttempt = async (req, res) => {
    try {
        const { studentId, testId } = req.params;
        const { status, windowCount } = req.body;

        const testAttempt = await TestGiven.findOne({ studentId, testId });
        if (!testAttempt) {
            return res.status(404).json({ success: false, message: 'Test attempt not found' });
        }

        if (status) testAttempt.status = status;
        if (windowCount !== undefined) testAttempt.windowCount = windowCount;

        await testAttempt.save();

        return res.status(200).json({ success: true, message: 'Test attempt updated successfully', data: testAttempt });
    } catch (error) {
        console.error('Error updating test attempt:', error);
        return res.status(500).json({ success: false, message: 'Failed to update test attempt' });
    }
};

export const getTestAttempt = async (req, res) => {
    try {
        const { studentId, testId } = req.params;

        const testAttempt = await TestGiven.findOne({ studentId, testId })
            .populate('testId', 'title subject description')
            .populate('studentId', 'name email');

        if (!testAttempt) {
            return res.status(404).json({ success: false, message: 'Test attempt not found' });
        }

        return res.status(200).json({ success: true, data: testAttempt });
    } catch (error) {
        console.error('Error fetching test attempt:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch test attempt' });
    }
};
