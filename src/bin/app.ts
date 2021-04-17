import express, { Application } from 'express';
import { json } from 'body-parser';
import { routes } from '../controllers/router';

// Boot express
export const app: Application = express();

// Body Parser
app.use(json());

// Application routing
routes(app);
