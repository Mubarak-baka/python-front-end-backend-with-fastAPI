from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import get_db, User, MenuItem, CustomerOrder, Base,engine
from schemas import CreateUserSchema, CreateMenuItemSchema, CreateOrderSchema

# Create an instance of FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

Base.metadata.create_all(bind=engine)

# Index route
@app.get('/')
def index():
    return {"message": "Welcome to my app"}

# ============ USER ROUTES ============

@app.get('/users/{user_id}')
def get_user(user_id: int, session: Session = Depends(get_db)):
    user = session.query(User).filter(User.id == user_id).first()
    if user:
        return user
    return {"message": "User not found"}

@app.get('/users')
def get_users(session: Session = Depends(get_db)):
    users = session.query(User).all()
    return users

@app.post('/users')
def create_user(user: CreateUserSchema, session: Session = Depends(get_db)):
    new_user = User(**user.dict())
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"message": "User created successfully", "user": new_user}

@app.patch('/users/{user_id}')
def update_user(user_id: int, user: CreateUserSchema, session: Session = Depends(get_db)):
    existing_user = session.query(User).filter(User.id == user_id).first()
    if existing_user:
        existing_user.name = user.name
        existing_user.email = user.email
        existing_user.phone = user.phone
        session.commit()
        session.refresh(existing_user)
        return {"message": "User updated successfully", "user": existing_user}
    return {"message": "User not found"}

@app.delete('/users/{user_id}')
def delete_user(user_id: int, session: Session = Depends(get_db)):
    user = session.query(User).filter(User.id == user_id).first()
    if user:
        session.delete(user)
        session.commit()
        return {"message": "User deleted successfully"}
    return {"message": "User not found"}

# ============ MENU ITEM ROUTES ============

@app.get('/menu_items/{item_id}')
def get_menu_item(item_id: int, session: Session = Depends(get_db)):
    menu_item = session.query(MenuItem).filter(MenuItem.id == item_id).first()
    if menu_item:
        return menu_item
    return {"message": "Menu item not found"}
#Get the MenuItem for a particular CustomerOrder
@app.get('/orders/{order_id}')
def get_order(order_id: int, session: Session = Depends(get_db)):
    order = session.query(CustomerOrder).filter(CustomerOrder.id == order_id).first()
    if order:
        return order.menu_item  # This will return the menu item for the given order
    return {"message": "Order not found"}


@app.get('/menu_items')
def get_menu_items(session: Session = Depends(get_db)):
    menu_items = session.query(MenuItem).all()
    return menu_items

@app.post('/menu_items')
def create_menu_item(item: CreateMenuItemSchema, session: Session = Depends(get_db)):
    print("Creating menu item:", item)
    new_item = MenuItem(**item.dict())
    session.add(new_item)
    session.commit()
    session.refresh(new_item)
    return {"message": "Menu item created successfully", "menu_item": new_item}

@app.patch('/menu_items/{item_id}')
def update_menu_item(item_id: int, item: CreateMenuItemSchema, session: Session = Depends(get_db)):
    existing_item = session.query(MenuItem).filter(MenuItem.id == item_id).first()
    if existing_item:
        existing_item.menu_item = item.menu_item
        existing_item.description = item.description
        existing_item.price = item.price
        existing_item.quantity = item.quantity
        session.commit()
        session.refresh(existing_item)
        return {"message": "Menu item updated successfully", "menu_item": existing_item}
    return {"message": "Menu item not found"}

@app.delete('/menu_items/{item_id}')
def delete_menu_item(item_id: int, session: Session = Depends(get_db)):
    item = session.query(MenuItem).filter(MenuItem.id == item_id).first()
    if item:
        session.delete(item)
        session.commit()
        return {"message": "Menu item deleted successfully"}
    return {"message": "Menu item not found"}

# ============ CUSTOMER ORDER ROUTES ============

@app.get('/orders/{order_id}')
def get_order(order_id: int, session: Session = Depends(get_db)):
    order = session.query(CustomerOrder).filter(CustomerOrder.id == order_id).first()
    if order:
        return order
    return {"message": "Order not found"}
#Get all orders for a particular MenuItem
@app.get('/menu-items/{menu_item_id}/orders')
def get_orders_for_menu_item(menu_item_id: int, session: Session = Depends(get_db)):
    menu_item = session.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
    if menu_item:
        return menu_item.orders  # This will return all orders for the given menu item
    return {"message": "Menu item not found"}


@app.get("/orders")
def get_orders(session: Session = Depends(get_db)):
    orders = session.query(CustomerOrder).all()
    return [
        {
            "id": order.id,
            "menu_item_id": order.menu_item_id,
            "menu_item_name": order.menu_item.menu_item if order.menu_item else "Unknown Item",
            "quantity": order.quantity,
            "price": order.price,
            "table_number": order.table_number,
        }
        for order in orders
    ]



@app.post('/orders')
def create_order(order: CreateOrderSchema, session: Session = Depends(get_db)):
    user = session.query(User).filter(User.id == order.user_id).first()
    if not user:
        return {"message": "User not found"}
    
    new_order = CustomerOrder(
        menu_item_id=order.menu_item_id,
        quantity=order.quantity,
        price=order.price,
        table_number=order.table_number,
        user_id=order.user_id  # Ensure user_id is set correctly
    )
    
    session.add(new_order)
    session.commit()  # Commit the changes
    session.refresh(new_order)  # Refresh the session to get the latest state of new_order
    
    return {"message": "Order created successfully", "order": new_order}

@app.patch('/orders/{order_id}')
def update_order(order_id: int, order: CreateOrderSchema, session: Session = Depends(get_db)):
    print(f"Received order data: {order.dict()}")  # Log the incoming data
    existing_order = session.query(CustomerOrder).filter(CustomerOrder.id == order_id).first()
    if existing_order:
        existing_order.menu_item_id = order.menu_item_id
        
        existing_order.quantity = order.quantity
        existing_order.price = order.price
        existing_order.table_number = order.table_number
        session.commit()
        session.refresh(existing_order)
        return {"message": "Order updated successfully", "order": existing_order}
    return {"message": "Order not found"}



@app.delete('/orders/{order_id}')
def delete_order(order_id: int, session: Session = Depends(get_db)):
    order = session.query(CustomerOrder).filter(CustomerOrder.id == order_id).first()
    if order:
        session.delete(order)
        session.commit()
        return {"message": "Order deleted successfully"}
    return {"message": "Order not found"}




@app.get("/users/{user_id}/orders")
def get_user_orders(user_id: int, session: Session = Depends(get_db)):
    orders = session.query(CustomerOrder).filter(CustomerOrder.user_id == user_id).all()
    if orders:
        # Include the menu item name in the response
        return [
            {
                "id": order.id,
                "menu_item_id": order.menu_item_id,
                "menu_item_name": order.menu_item.menu_item,
                "quantity": order.quantity,
                "price": order.price,
                "table_number": order.table_number,
            }
            for order in orders
        ]
    return {"message": "No orders found for this user"}

