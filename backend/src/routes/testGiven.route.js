import express from 'express';
import {
    startTest,
    submitTest,
    updateTestAttempt,
    getTestAttempt
} from '../controller/testGivenController.js';

const router = express.Router();

router.post('/attempt/start', startTest);

router.post('/attempt/submit', submitTest);

router.put('/attempt/:studentId/:testId', updateTestAttempt);

router.get('/attempt/:studentId/:testId', getTestAttempt);

export default router;
