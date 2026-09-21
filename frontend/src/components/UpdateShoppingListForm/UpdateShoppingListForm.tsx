import { useState, useEffect } from 'react';

interface UpdateShoppingListFormProps {
    shoppingListId: number;
}

const UpdateShoppingListForm: React.FC<UpdateShoppingListFormProps> = ({ shoppingListId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [openAddList, setOpenAddList] = useState(false);
    const [error, setError] = useState('');
    const [visibility, setVisibility] = useState(false);

    const handleVisibility = () => {
        setVisibility(!visibility);
    };

    // Fetch current shopping list data to populate the form
    useEffect(() => {
        const fetchShoppingListData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/shopping-lists/${shoppingListId}`);
                if (!response.ok) {
                    throw new Error('Shopping list not found');
                }
                const data = await response.json();
                setName(data.name || '');
                setDescription(data.description || '');
            } catch (err) {
                setError('Failed to fetch shopping list data');
            }
        };

        fetchShoppingListData();
    }, [shoppingListId]);

    // Handle form submission to update the shopping list
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const updatedList = { name, description };

        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${shoppingListId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedList),
            });

            if (!response.ok) {
                throw new Error('Failed to update shopping list');
            }

            console.log('Shopping list updated:', await response.json());
            window.location.reload();
        } catch (err) {
            setError('Error updating shopping list: ' + err);
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
                    viewBox="0 0 16 16"
                >
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
                Update
            </button>
            
            {visibility && (
                <div className='position-fixed z-3 top-50 start-50 translate-middle w-75'>
                    <form onSubmit={handleUpdate} className='bg-dark container p-5 rounded-2 w-50'>
                        <h1 className='text-light'>Update Shopping List</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group text-light">
                            <label htmlFor="listName">Name</label>
                            <input
                                type="text"
                                id="listName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter shopping list name"
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
                                placeholder="Enter a brief description"
                                className='form-control'
                                rows={3}
                            />
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

export default UpdateShoppingListForm;
