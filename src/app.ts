import express from 'express';
import matrixRoutes from './routes/matrixRoutes';

const app = express();

app.use(express.json());
app.use('/', matrixRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });


export default app;
