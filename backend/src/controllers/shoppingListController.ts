import { Request, Response } from 'express';
import { RowDataPacket } from "mysql2";
import pool from '../config/db';

interface ShoppingList {
    id: number;
    name: string;
    description: string;
    creationDate: string;
}

interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    status: boolean;
    shoppingListId: number;
}

// Create all shopping list
export const getShoppingLists = async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT 
                sl.id AS shopping_list_id,
                sl.name AS shopping_list_name,
                DATE_FORMAT(sl.created_at, '%Y/%m/%d %H:%i') AS shopping_list_created_at,  -- Optional format
                sli.id AS shopping_list_item_id,
                sli.quantity AS item_quantity,
                sli.status AS item_status,
                i.id AS item_id,
                i.name AS item_name,
                i.description AS item_description
            FROM 
                shopping_lists sl
            LEFT JOIN 
                shopping_list_items sli ON sl.id = sli.shopping_list_id
            LEFT JOIN 
                items i ON sli.item_id = i.id;
        `;

        const [rows] = await pool.query(query);

        if (Array.isArray(rows)) {
            const groupedResults = rows.reduce((acc: any, row: any) => {
                const { shopping_list_id, shopping_list_name, shopping_list_created_at, item_id, item_name, item_description, item_quantity, item_status } = row;

                if (!acc[shopping_list_id]) {
                    acc[shopping_list_id] = {
                        id: shopping_list_id,
                        name: shopping_list_name,
                        created_at: shopping_list_created_at,
                        items: []
                    };
                }

                if (item_id) {
                    acc[shopping_list_id].items.push({
                        id: item_id,
                        name: item_name,
                        description: item_description,
                        quantity: item_quantity,
                        status: item_status,
                    });
                }

                return acc;
            }, {});

            res.json(Object.values(groupedResults));
        } else {
            res.status(500).json({ error: "Unexpected query result format" });
        }
    } catch (error) {
        console.error("Error fetching shopping lists:", error);
        res.status(500).json({ error: "Failed to fetch shopping lists" });
    }
};

export const getShoppingListById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const [listRows] = await pool.query('SELECT * FROM shopping_lists WHERE id = ?', [id]);

        if ((listRows as any[]).length === 0) {
            res.status(404).json({ message: 'Shopping list not found' });
        }

        const [items] = await pool.query(`
            SELECT si.id, si.quantity, si.status, i.name, i.description
            FROM shopping_list_items si
            JOIN items i ON si.item_id = i.id
            WHERE si.shopping_list_id = ?
        `, [id]);

        const shoppingList = (listRows as any[])[0];
        shoppingList.items = items;

        res.json(shoppingList);
    } catch (error) {
        console.error('Error fetching shopping list:', error);
        
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error fetching shopping list', error });
        }
    }
};

// Update shopping list by ID
export const updateShoppingList = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Get the shopping list ID from the request params
    const { name, description } = req.body; // Get the updated name and description from the request body

    // Check if both fields are provided
    if (!name || !description) {
        res.status(400).json({ message: 'Name and description are required' });
    }

    try {
        // Update the shopping list in the database
        const [result] = await pool.query<RowDataPacket[]>(
            'UPDATE shopping_lists SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Shopping list not found' });
        }

        // Return the updated shopping list details
        res.json({ id, name, description });
    } catch (error) {
        console.error('Error updating shopping list:', error);
        res.status(500).json({ message: 'Error updating shopping list', error });
    }
};

// Get all shopping lists
export const getAllShoppingLists = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM shopping_lists');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shopping lists', error });
    }
};

// Create a shopping list
export const createShoppingList = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO shopping_lists (name, description) VALUES (?, ?)',
            [name, description]
        );
        const insertedId = (result as any).insertId;
        res.status(201).json({ id: insertedId, name, description, created_at: new Date() });
    } catch (error) {
        res.status(500).json({ message: 'Error creating shopping list', error });
    }
};

// Update a shopping list
// export const updateShoppingList = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     try {
//         const [result] = await pool.query(
//             'UPDATE shopping_lists SET name = ?, description = ? WHERE id = ?',
//             [name, description, id]
//         );
//         if ((result as any).affectedRows === 0) {
//             res.status(404).json({ message: 'Shopping list not found' });
//         }
//         res.json({ id, name, description });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating shopping list', error });
//     }
// };

// Delete a shopping list
export const deleteShoppingList = async (req: Request, res: Response): Promise<void> => {
    console.log('Delete request received for ID:', req.params.id);
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM shopping_lists WHERE id = ?', [id]);
        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Shopping list not found' });
            return;
        }
        res.json({ message: 'Shopping list deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shopping list', error });
    }
};

// Search shopping lists by name or description
export const searchShoppingLists = async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
        const [rows] = await pool.query(
            `SELECT * FROM shopping_lists 
            WHERE name LIKE ? OR description LIKE ?`,
            [`%${query}%`, `%${query}%`]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error searching shopping lists', error });
    }
};

// Get all shopping lists containing a specific item
export const getShoppingListsByItem = async (req: Request, res: Response) => {
    const { itemId } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT sl.id, sl.name, sl.description, sl.created_at
            FROM shopping_lists sl
            JOIN shopping_list_items sli ON sl.id = sli.shopping_list_id
            WHERE sli.item_id = ?
        `, [itemId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shopping lists by item', error });
    }
};
