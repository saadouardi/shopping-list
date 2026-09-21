import React, { useState } from 'react';

const CreateShoppingListForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [openAddList, setOpenAddList] = React.useState(false);

    const handleOpenList = () => {
        setOpenAddList(item => !item)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const newList = {
            name,
            description,
            creationDate: new Date().toISOString().split('T')[0],
            items: [],
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/shopping-lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newList),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create a shopping list');
            }
    
            const result = await response.json();
            console.log('New Shopping List:', result);
    
            // Optionally update the frontend state
            setName('');
            setDescription('');
            setOpenAddList(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    

    return (

        <>
            <button className="btn btn-success" type="button" onClick={handleOpenList}>Add Shopping List</button>

            {openAddList &&
                <div className='position-fixed z-3 top-50 start-50 translate-middle w-75'>
                    <form onSubmit={handleSubmit} className="bg-dark container d-flex flex-column align-items-start justify-content-center flex-wrap p-5 grid gap-3 rounded-2 w-50">
                        <div>
                            <h1>Add Shopping List</h1>
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="listName">Name</label>
                            <input
                                type="text"
                                className='form-control'
                                id="listName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter shopping list name"
                                required
                            />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className='form-control'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter a brief description"
                                rows={3}
                            />
                        </div>
                        <div className='d-flex gap-2'>
                            <button type="submit" className="btn btn-primary">
                                Create Shopping List
                            </button>
                            <button className="btn btn-light" onClick={handleOpenList}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            }

        </>
    );
};

export default CreateShoppingListForm;
