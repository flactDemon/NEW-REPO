import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather.js';
import marketRoutes from './routes/market.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/market', marketRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
