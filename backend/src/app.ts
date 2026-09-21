import express from 'express';
import cors from 'cors';
import shoppingListsRouter from './routes/shoppingListRoutes';
import itemsRouter from './routes/listItemsRoutes';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/shopping-lists', shoppingListsRouter);
app.use('/api/items', itemsRouter);

// Error Handling Middleware
app.use(errorHandler);

export default app;
