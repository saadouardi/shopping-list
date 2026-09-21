import React, { useState, useEffect } from 'react';

interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    status: string;
    shopping_list_id: number;
}

interface AddItemFormProps {
    shopping_list_id: number;
    onAddItem: (newItem: Item) => void;
    item?: Item;
    onUpdateItem: (updatedItem:Item) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ shopping_list_id, onAddItem, item, onUpdateItem }) => {
    const [name, setName] = useState(item?.name || '');
    const [description, setDescription] = useState(item?.description || '');
    const [quantity, setQuantity] = useState(item?.quantity || 1);
    const [status, setStatus] = useState(item?.status === 'purchased');
    const [message, setMessage] = useState('');
    const [addItem, setAddItem] = useState(false);

    const handleAddItem = () => {
        setAddItem((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const statusValue = status ? 'purchased' : 'pending';

        const newItem = { 
            id: item?.id || Date.now(), // Use existing ID if available
            name, 
            description, 
            quantity, 
            shopping_list_id, 
            status: statusValue 
        };

        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error(`Failed to add item: ${response.statusText}`);
            }

            const data = await response.json();
            setMessage(`Item added successfully: ${data.name}`);
            onAddItem(newItem);
            setName('');
            setDescription('');
            setQuantity(1);
            setStatus(false);
            setAddItem(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding item:', error);
            setMessage('Failed to add item.');
        }
    };

    return (
        <>
            <button className='btn btn-success' onClick={handleAddItem}>
                Add Item
            </button>
            {addItem && (
                <div className='position-fixed z-3 top-50 start-50 translate-middle w-75'>
                    <form onSubmit={handleSubmit} className="bg-dark container p-5 rounded-2 w-50">
                        <h1 className='text-light'>Add Item</h1>
                        <div className="form-group text-light">
                            <label htmlFor="itemName">Item Name</label>
                            <input
                                type="text"
                                id="itemName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter item name"
                                className='form-control'
                                required
                            />
                        </div>
                        <div className="form-group text-light">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter item description"
                                className='form-control'
                                rows={2}
                            />
                        </div>
                        <div className="form-group text-light">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className='form-control'
                                min={1}
                                required
                            />
                        </div>
                        <div className="form-group text-light">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                />
                                Purchased
                            </label>
                        </div>
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                        <button type="button" className="btn btn-light" onClick={handleAddItem}>
                            Cancel
                        </button>
                        {message && <p className="text-light">{message}</p>}
                    </form>
                </div>
            )}
        </>
    );
};

export default AddItemForm

