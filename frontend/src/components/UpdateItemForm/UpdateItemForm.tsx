import { useState, useEffect } from 'react';

interface UpdateItemFormProps {
    itemId: number;
    shopping_list_id: number;
}

const UpdateItemForm: React.FC<UpdateItemFormProps> = ({ itemId, shopping_list_id }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [visibility, setVisibility] = useState(false);

    const handleVisibility = () => {
        setVisibility(!visibility);
    }

    // Fetch current item data to populate the form
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/items/${itemId}`);
                if (!response.ok) {
                    throw new Error('Item not found');
                }
                const data = await response.json();
                setName(data.name || '');
                setDescription(data.description || '');
                setQuantity(data.quantity || 1);
                setStatus(data.status || '');
            } catch (err) {
                setError('Failed to fetch item data');
            }
        };
        
        fetchItemData();
    }, [itemId]);

    // Handle form submission
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const updatedItem = { name, description, quantity, status, shopping_list_id };

        try {
            const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            if (!response.ok) {
                throw new Error('Failed to update item');
            }
            console.log('Item updated:', await response.json());
            window.location.reload();
        } catch (err) {
            setError('Error updating item: ' + err);
        }
        
    };

    return (
        <>
            <button 
                className='btn btn-warning'
                onClick={() => handleVisibility()}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" fill="currentColor" 
                    className="bi bi-arrow-clockwise" 
                    viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg> 
                {}
            </button>
            {visibility && (
                <div className='position-fixed z-3 top-50 start-50 translate-middle w-75'>
                    <form onSubmit={handleUpdate} className='bg-dark container p-5 rounded-2 w-50'>
                    <h1 className='text-light'>Update Item</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
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
                            />
                        </div>
                        <div className="form-group text-light">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={status === 'purchased'}
                                    onChange={(e) => setStatus(e.target.checked ? 'purchased' : '')}
                                />
                                Purchased
                            </label>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-success"
                        >
                            Submit
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-light"
                            onClick={() => handleVisibility()} 
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default UpdateItemForm;
