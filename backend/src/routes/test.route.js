import express from 'express';
import { 
    createTest, 
    getAllTests, 
    getTestById, 
    updateTest, 
    deleteTest,
    addQuestion,
    updateQuestion,
    removeQuestion
} from '../controller/testController.js';

const router = express.Router();
router.post('/create-test', createTest);
router.get('/all-test', getAllTests);
router.get('/tests/:id', getTestById);
router.put('/tests/:id', updateTest);
router.delete('/tests/:id', deleteTest);
//question ke liye
router.post('/tests/:id/questions', addQuestion);
router.put('/tests/:id/questions/:questionId', updateQuestion);
router.delete('/tests/:id/questions/:questionId', removeQuestion);


export default router;
