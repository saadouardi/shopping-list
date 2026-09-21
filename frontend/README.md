# Shopping List App - Frontend

This is the frontend part of the **Shopping List App**, developed using **React** and **TypeScript**. The app allows users to create, manage, and filter shopping lists and their respective items. It communicates with the backend API for CRUD operations.

## Features

- Display a list of shopping lists.
- View, create, edit, and delete shopping lists and items.
- Filter shopping lists by name or description.
- Display shopping lists containing specific items.
- Responsive design for mobile, tablet, and desktop views.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **TypeScript**: Type-safe JavaScript for better development experience and maintainability.
- **Axios**: For making HTTP requests to the backend API.
- **CSS/SCSS**: For styling, ensuring responsive layouts across different devices.
- **React Router**: For page navigation and routing within the app.

## Setup Instructions

### Prerequisites

- Node.js (version 16+)
- npm or yarn

### Installation

### Available Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Runs the test suite for the app.

## API Endpoints

The frontend communicates with the following backend endpoints:

- `GET /api/shopping-lists`: Fetch all shopping lists.
- `POST /api/shopping-lists`: Create a new shopping list.
- `PUT /api/shopping-lists/:id`: Update a shopping list.
- `DELETE /api/shopping-lists/:id`: Delete a shopping list.
- `GET /api/items`: Fetch all items.
- `POST /api/items`: Create a new item for a list.
- `PUT /api/items/:id`: Update an item.
- `DELETE /api/items/:id`: Delete an item.

## Testing

You can use Postman or similar tools to test the API before integrating it with the frontend. Make sure your backend is running before testing the frontend.

## Troubleshooting

- If you encounter CORS issues, ensure the backend is configured to handle CORS requests from the frontend.
- If data isn't updating in the UI, verify that the API requests are returning the expected data by checking the browser's network tab.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
