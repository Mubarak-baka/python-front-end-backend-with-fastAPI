###FastAPI Food Ordering System

###Overview
This project implements a food ordering system where users can place orders from a menu, and staff can manage these orders. Built using FastAPI, SQLAlchemy, and SQLite, it provides API endpoints for managing users, menu items, and customer orders.
Features
• User Management: Create, read, update, and delete users.
• Menu Management: Add, update, and delete menu items.
• Order Management: Users can create orders, and staff can view or manage them.
• Relationships:
  - Each User can place multiple CustomerOrders.
  - Each CustomerOrder is tied to a MenuItem 
-  User could order multiple MenuItems, and at the same time, a MenuItem could be ordered by multiple Users

##Models
1. User:
   - id, name, email, phone, created_at
   - Related to CustomerOrder (one-to-many).

2. MenuItem:
   - id, menu_item, description, price, quantity, created_at
   - Related to CustomerOrder (one-to-many).

3. CustomerOrder:
   - id, menu_item_id, user_id, quantity, price, table_number, created_at
   - menu_item and user are foreign keys, linking to the MenuItem and User tables.
##Setup
1. Install dependencies:
   pip install fastapi uvicorn sqlalchemy

2. Run the app:
   uvicorn main:app --reload

3. Access the API at http://127.0.0.1:8000.
API Endpoints
### Users
- **GET /users/{user_id}**: Get user by ID.
- **GET /users**: List all users.
- **POST /users**: Create a new user.
- **PATCH /users/{user_id}**: Update user details.
- **DELETE /users/{user_id}**: Delete a user.

### Menu Items
- **GET /menu_items/{item_id}**: Get menu item by ID.
- **GET /menu_items**: List all menu items.
- **POST /menu_items**: Add a new menu item.
- **PATCH /menu_items/{item_id}**: Update a menu item.
- **DELETE /menu_items/{item_id}**: Delete a menu item.

### Orders
- **GET /orders/{order_id}**: Get order by ID.
- **GET /orders**: List all orders.
- **POST /orders**: Create a new order.
- **PATCH /orders/{order_id}**: Update an order.
- **DELETE /orders/{order_id}**: Delete an order.
- **GET /users/{user_id}/orders**: Get orders placed by a user.
Database
This project uses SQLite for the database. The database file is app.db.
License
This project is licensed under the MIT License.
