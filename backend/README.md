# Shopping List App - Backend

This is the backend for the **Shopping List App**, developed using **Node.js**, **TypeScript**, and **Express.js**. The backend provides a RESTful API for managing shopping lists and items.

## Features

- CRUD operations for shopping lists and items.
- Add and remove items from shopping lists.
- Search shopping lists by name or description.
- Fetch shopping lists that contain a specific item.

## Technologies Used

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building the API.
- **TypeScript**: For type safety and better maintainability.
- **MySQL**: Relational database for storing shopping lists and items.
- **Sequelize ORM**: For interacting with the MySQL database.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing (CORS) between frontend and backend.

## Setup Instructions

### Prerequisites

- Node.js (version 16+)
- npm or yarn
- MySQL Database setup (can be local or hosted)

### Installation

### Available Routes

- `GET /api/shopping-lists`: Get all shopping lists.
- `POST /api/shopping-lists`: Create a new shopping list.
- `PUT /api/shopping-lists/:id`: Update an existing shopping list.
- `DELETE /api/shopping-lists/:id`: Delete a shopping list.
- `GET /api/items`: Get all items.
- `POST /api/items`: Create a new item for a shopping list.
- `PUT /api/items/:id`: Update an existing item.
- `DELETE /api/items/:id`: Delete an item.

## Troubleshooting

- If you encounter CORS issues, ensure that the backend is correctly configured to allow requests from your frontend's URL.
- If data is not being saved or updated, check the database connection and ensure the migrations have been applied.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
