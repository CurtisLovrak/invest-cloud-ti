import express from 'express';
import {Md5} from 'ts-md5'
import { fetchData, multiplyMatricies, matrixSize, matrixA, matrixB , postData} from '../controllers/matrixController';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await fetchData(); // Call fetchData to populate matrixA and matrixB
    const result = multiplyMatricies(matrixA, matrixB); // Perform matrix multiplication
		const md5Hash = Md5.hashStr(result); // Hash the result string.
		// res.json(md5Hash); // sending this as a response for now, making a POST route now
		await postData(md5Hash);
		// response object should have {Value: string, Cause: string, and Success: bool}
		res.json({ md5Hash }); // so that I see a success when the GET to "/" works
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

