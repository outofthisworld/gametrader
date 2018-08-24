import express from 'express';
import http from 'http';

const app = express();
export const httpServer = http.createServer(app);
export default app;
