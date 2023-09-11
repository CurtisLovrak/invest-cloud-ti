// define Express routes for API

/*
import express from 'express';
import { fetchData, multiplyMatricies, matrixSize, matrixA, matrixB } from '../controllers/matrixController';

const router = express.Router();

router.get(`/matrix/${matrixSize}`, async (req, res) => {
    try {
        const matrixSize = parseInt(req.params.matrixSize, 10);
        const { A, B } = await fetchData(matrixSize);
        const result = multiplyMatricies(A, B);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
*/
// src/routes/matrixRoutes.ts

import express from 'express';
import { fetchData, multiplyMatricies, matrixSize, matrixA, matrixB } from '../controllers/matrixController';

const router = express.Router();

router.get('/test', (req, res) => {
	res.json({ message: 'Server is working!' });
	console.log('test works')
});

router.get('/matrix', async (req, res) => {
  try {
    await fetchData(); // Call fetchData to populate matrixA and matrixB
    const result = multiplyMatricies(matrixA, matrixB); // Perform matrix multiplication
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

