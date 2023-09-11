import express from 'express';
import {Md5} from 'ts-md5'
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
		const md5Hash = Md5.hashStr(result); // Hash the result string.
		res.json(md5Hash);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

