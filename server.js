import express from 'express';
import router from './routes/index';

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

app.use(express.json());
// Load all routes from routes/index.js
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
