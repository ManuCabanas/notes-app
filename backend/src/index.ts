import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Nōta API is running' });
});

app.use('/', noteRoutes);
app.use('/', categoryRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

// Export for Vercel serverless
export default app;
