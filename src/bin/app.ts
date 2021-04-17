import express, { Application } from 'express';
import { json } from 'body-parser';

// Boot express
export const app: Application = express();

// Body Parser
app.use(json());
