import React from 'react';
import UpdateShoppingListForm from '../UpdateShoppingListForm/UpdateShoppingListForm';
import AddItemForm from '../AddItemForm/AddItemForm';
import UpdateItemForm from '../UpdateItemForm/UpdateItemForm';
import './ShoppingCard.scss';

interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    status: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    items: Item[];
    date: string;
}

const ShoppingCard: React.FC<Product> = ({ id, name, description, items, date }) => {
    const [toggleList, setToggleList] = React.useState(false);
    const [shoppingLists, setShoppingLists] = React.useState<Product[]>([]);
    const [deleteItem, setDeleteItem] = React.useState(false);
    const [currentItems, setCurrentItems] = React.useState<Item[]>(items);
    const [editItem, setEditItem] = React.useState<Item | null>(null); // to track which item is being edited


    const handleAddItem = (newItem: Item) => {
        setCurrentItems((prevItems) => [...prevItems, newItem]);
    };

    const handleOnCheck = (item: any) => {
        console.log(`item selected: ${item.name}`)
    }

    const handleToggleList = () => {
        setToggleList(toggleList => !toggleList)
    }

    const handleEdit = (item: Item) => {
        setEditItem(item);
    };
    

    const handleUpdateItem = async (updatedItem: Item) => {
        try {
            const response = await fetch(`http://localhost:5000/api/items/${updatedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update item');
            }
    
            // Update the item in the state
            setCurrentItems((prevItems) => prevItems.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            ));
            setEditItem(null); // Close the edit form
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDeleteItem = async (itemId: number) => {
        try {
            const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
    
            setCurrentItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the shopping list');
            }
        
            setShoppingLists((prev) => prev.filter((item) => item.id !== id));
            setDeleteItem(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting shopping list:', error);
        }
    };
    
    return (
        <div className="card" key={id}>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center justify-content-start gap-2'>
                        {toggleList ? (
                            <button type="button" className='btn btn-primary rounded-5 p-1' onClick={handleToggleList}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/></svg>                    
                                {}
                            </button>
                        ) : (
                            <button type="button" className='btn btn-primary rounded-5 p-1' onClick={handleToggleList}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>                    
                                {}
                            </button>
                        )}
                        <div className='d-flex align-items-center justify-content-center gap-3'>
                            <h5 className="card-title text-primary m-0">{name} ({items.length === 0 || items.length === 1 ? items.length + " item" : items.length + " items"})</h5>
                        </div>
                    </div>
                    <div className='d-flex gap-1'>
                        <UpdateShoppingListForm shoppingListId={id}/>
                        <button
                            title='Delete Shopping List'
                            type="button"
                            className='btn btn-danger' 
                            onClick={() => handleDelete()}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <p className="card-text text-light">{description}</p>
                {toggleList &&
                    <>
                        {items.length > 0 ? (
                            <table className='table table-dark'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className='col'>#ID</th>
                                        <th>Item</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {items.map((item, index) => (
                                    <tbody>
                                        <tr key={index}>
                                            <td><input title='select' type="checkbox" name="" id="" onChange={() => handleOnCheck(item)}/></td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                {item.status === 'purchased' ? 
                                                    (
                                                        <button className='btn btn-success'>purchased</button>)
                                                    :(
                                                        <button className='btn btn-warning'>pending</button>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <div className='d-flex gap-1'>
                                                    <UpdateItemForm itemId={item.id} shopping_list_id ={id}/>
                                                    <button 
                                                        className='btn btn-danger'
                                                        onClick={() => handleDeleteItem(item.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/></svg>                
                                                        {}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        ) : (
                            <div className='d-flex align-items-center justify-content-center '>
                                <h3 className='text-light'>No item found</h3>
                            </div>
                        )}
                    </>
                }
                <div className='d-flex justify-content-between align-items-center gap-1'>
                    <AddItemForm 
                        shopping_list_id={id}  
                        onAddItem={handleAddItem}
                        item={editItem ? { ...editItem, shopping_list_id: id } : undefined}
                        onUpdateItem={(updatedItem) => handleUpdateItem(updatedItem)}
                    />
                    <p className='badge badge-lightbadge text-bg-primary m-0'>Ceated at: {date}</p>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCard
