import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes';
import categoryRoutes from './routes/categoryRoutes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', noteRoutes);
app.use('/', categoryRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
