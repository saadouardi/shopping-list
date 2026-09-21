import { Request, Response } from 'express';
import pool from '../config/db';

// Get all items
export const getAllItems = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM items');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

// Get item by ID
export const getItemById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Query the database for the item with the provided ID
        const [itemRows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);

        // Check if the item was found
        if ((itemRows as any[]).length === 0) {
            res.status(404).json({ message: 'Item not found' });
            return; // Exit the function if the item is not found
        }

        // Get the first (and only) item from the results
        const item = (itemRows as any[])[0];

        res.json(item);
    } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Error fetching item', error });
    }
};

// Create a new item
export const createItem = async (req: Request, res: Response) => {
    const { name, description, quantity, shopping_list_id, status } = req.body;
    try {
        // Insert into `items` table
        const [itemResult] = await pool.query(
            'INSERT INTO items (name, description) VALUES (?, ?)',
            [name, description]
        );

        const itemId = (itemResult as any).insertId;

        // Insert into `shopping_list_items` table
        const addedAt = new Date();
        await pool.query(
            'INSERT INTO shopping_list_items (shopping_list_id, item_id, quantity, status, added_at) VALUES (?, ?, ?, ?, ?)',
            [shopping_list_id, itemId, quantity, status, addedAt]
        );

        res.status(201).json({
            message: 'Item and shopping list entry added successfully',
            item: { id: itemId, name, description },
            shoppingListItem: {
                shopping_list_id,
                item_id: itemId,
                quantity,
                status,
                added_at: addedAt,
            },
        });
    } catch (error) {
        console.error('Error in createItem:', error);
        res.status(500).json({ message: 'Error creating item and shopping list entry', error });
    }
};

// Update an item
export const updateItem = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, quantity, status, shopping_list_id } = req.body;

    try {
        // Update the `items` table
        const [itemResult] = await pool.query(
            'UPDATE items SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );

        if ((itemResult as any).affectedRows === 0) {
            res.status(404).json({ message: 'Item not found in items table' });
            return; // Exit the function if no rows are affected
        }

        // Update the `shopping_list_items` table
        const [shoppingListResult] = await pool.query(
            'UPDATE shopping_list_items SET quantity = ?, status = ? WHERE item_id = ? AND shopping_list_id = ?',
            [quantity, status, id, shopping_list_id]
        );

        if ((shoppingListResult as any).affectedRows === 0) {
            res.status(404).json({ message: 'Item not found in shopping_list_items table' });
            return; // Exit the function if no rows are affected
        }

        // Send the success response
        res.json({
            message: 'Item and shopping list entry updated successfully',
            item: { id, name, description },
            shoppingListItem: {
                shopping_list_id,
                quantity,
                status,
            },
        });
    } catch (error) {
        console.error('Error in updateItem:', error);
        res.status(500).json({ message: 'Error updating item and shopping list entry', error });
    }
};

// Delete an item
export const deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM items WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete item' });
    }
};
