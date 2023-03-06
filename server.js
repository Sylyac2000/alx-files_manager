import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// Load all routes from routes/index.js
app.use('/', routes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
