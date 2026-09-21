import express from 'express';
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} from '../controllers/listItemController';

const router = express.Router();

// CRUD routes
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;

