from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Text, Integer, VARCHAR, DateTime,ForeignKey,create_engine
from datetime import datetime
from sqlalchemy.orm import sessionmaker

#connect to our app.db 
engine=create_engine('sqlite:///app.db',echo=True)

# creating a sessin from sqlalchemy



#create a session 
Session=sessionmaker(bind=engine)
#instance of a session
def get_db():
    db=Session()
    try:
          yield db
    finally:
        db.close()

# Create a base model
Base = declarative_base()


# Create our model

"""1> must provide the table name via the __tablename__
it must have at least one column defined """
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)  # Primary key for the user
    name = Column(Text, nullable=False)      # User's name, cannot be null
    email = Column(VARCHAR, nullable=True, unique=True)  # User's email, must be unique
    phone = Column(VARCHAR, nullable=True, unique=True)  # User's phone number, must be unique
    created_at = Column(DateTime, default=datetime.now)  # Timestamp of creation


class Savings(Base):
    __tablename__="savings"

    id = Column(Integer(), primary_key=True)  # Primary key for the user
    amount = Column(Integer(), nullable=False)      # User's name, cannot be null
    user_id = Column(Integer(), ForeignKey('users.id'))  # User's email, must be unique
    created_at = Column(DateTime, default=datetime.now)  # Timestamp of creation