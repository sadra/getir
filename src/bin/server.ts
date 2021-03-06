import { app } from './app';
import { connectDB } from '../repositories/database.handler';
require('dotenv').config();

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
