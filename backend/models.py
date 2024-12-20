from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Text, Integer, VARCHAR, DateTime, ForeignKey, create_engine
from datetime import datetime
from sqlalchemy.orm import sessionmaker,relationship

# Connect to our app.db 
engine = create_engine('sqlite:///app.db', echo=True)

# Creating a session from SQLAlchemy
Session = sessionmaker(bind=engine)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

# Create a base model
Base = declarative_base()

# Create our models

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)  # Primary key for the user
    name = Column(Text, nullable=False)      # User's name, cannot be null
    email = Column(VARCHAR, nullable=True, unique=True)  # User's email, must be unique
    phone = Column(VARCHAR, nullable=True, unique=True)  # User's phone number, must be unique
    created_at = Column(DateTime, default=datetime.now)  # Timestamp of creation

    orders = relationship('CustomerOrder', back_populates='user')
class MenuItem(Base):
    __tablename__ = 'menu_items'

    id = Column(Integer, primary_key=True)
    menu_item = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now)

    orders = relationship('CustomerOrder', back_populates='menu_item', cascade="all, delete-orphan")

class CustomerOrder(Base):
    __tablename__ = 'customer_orders'

    id = Column(Integer, primary_key=True)
    menu_item_id = Column(Integer, ForeignKey('menu_items.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    quantity = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    table_number = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now)

    menu_item=relationship('MenuItem',back_populates='orders')
    user=relationship('User',back_populates='orders')
    



