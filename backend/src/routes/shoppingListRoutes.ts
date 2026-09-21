import express from 'express';
import { 
    getAllShoppingLists,
    getShoppingLists,
    getShoppingListById,
    createShoppingList,
    updateShoppingList,
    deleteShoppingList,
    searchShoppingLists,
    getShoppingListsByItem
} from '../controllers/shoppingListController';

const router = express.Router();

router.get('/all', getAllShoppingLists);
router.get('/', getShoppingLists);
router.get('/search', searchShoppingLists);
router.get('/:id', getShoppingListById);
router.post('/', createShoppingList);
router.put('/:id', updateShoppingList);
router.delete('/:id', deleteShoppingList);
router.get('/item/:itemId', getShoppingListsByItem);

export default router;
