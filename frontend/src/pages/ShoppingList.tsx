import React from 'react';
import ShoppingCard from '../components/ShoppingCard/ShoppingCard';
import CreateShoppingListForm from '../components/CreateShoppingListForm/CreateShoppingListForm';

const shoppingLists = [
    {
        id: 1,
        name: "Weekly Groceries",
        description: "Groceries for the week",
        created_at: "2024-11-20",
        items: [
            { id: 101, name: "Milk", description: "1 liter of whole milk", quantity: 2, status: 'pending' },
            { id: 102, name: "Eggs", description: "Pack of 12 eggs", quantity: 1, status: 'purchased' },
            { id: 103, name: "Bread", description: "Whole grain bread", quantity: 1, status: 'pending' },
        ],
        },
        {
        id: 2,
        name: "Party Supplies",
        description: "Items needed for the birthday party",
        created_at: "2024-11-15",
        items: [
            { id: 201, name: "Balloons", description: "Pack of 50 balloons", quantity: 2, status: 'purchased' },
            { id: 202, name: "Plastic Cups", description: "Set of 30 cups", quantity: 1, status: 'pending' },
            { id: 203, name: "Cake", description: "Chocolate birthday cake", quantity: 1, status: 'pending' },
        ],
        },
        {
        id: 3,
        name: "Office Supplies",
        description: "Supplies for the office",
        created_at: "2024-11-18",
        items: [
            { id: 301, name: "Pens", description: "Pack of 10 blue pens", quantity: 3, status: 'purchased' },
            { id: 302, name: "Notebooks", description: "Set of 5 notebooks", quantity: 2, status: 'pending' },
            { id: 303, name: "Printer Ink", description: "Black ink cartridge", quantity: 1, status: 'pending' },
        ],
        },
        {
        id: 3,
        name: "Office Supplies",
        description: "Supplies for the office",
        created_at: "2024-11-18",
        items: [
            { id: 301, name: "Pens", description: "Pack of 10 blue pens", quantity: 3, status: 'purchased' },
            { id: 302, name: "Notebooks", description: "Set of 5 notebooks", quantity: 2, status: 'pending' },
            { id: 303, name: "Printer Ink", description: "Black ink cartridge", quantity: 1, status: 'pending' },
        ],
        },
];

const 
ShoppingList: React.FC = () => {
    const [results, setResults] = React.useState(shoppingLists);
    
    React.useEffect(() => {
        const fetchShoppingLists = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/shopping-lists');
                const data = await response.json();
                setResults(data);
            } catch (error) {
                setResults(shoppingLists);
                console.error('Error fetching shopping lists:', error);
            }
        };
        fetchShoppingLists();
    }, []);

    const handleSearch = (e: any) => {
        const searchQuery = e.target.value.trim().toLowerCase();

        if (!searchQuery) {
            setResults(shoppingLists);
        }else {
            setResults(shoppingLists.filter( list => 
                list.name.toLowerCase().includes(searchQuery))
            );
        }
    }

    return (
        <div className='d-flex flex-column align-items-center grid gap-3'>
            <div>
                <div className='product-search d-flex flex-column align-items-start justify-content-center p-5'>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder='Search item here...' aria-label="Search input" onChange={handleSearch}/>
                        <CreateShoppingListForm/>
                    </div>
                </div>

                <div className="product-list d-flex flex-column align-items-start justify-content-center flex-wrap p-2 grid gap-3">
                    <div>
                        <h4>Shopping List <span>({results.length})</span></h4>
                    </div>
                    {results.map((result, index) => {
                        return(
                            <ShoppingCard
                                key={index}
                                id={result.id}
                                name={result.name}
                                description={result.description}
                                items={result.items}
                                date={result.created_at}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShoppingList
