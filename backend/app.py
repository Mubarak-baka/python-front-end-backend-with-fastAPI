from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import get_db, User
from schemas import CreateUserSchema
#create an instance of fastapi
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

#DEFINING ROUTE
@app.get('/')
def index():
    return {"message": "welcome to my  app"}

#getting a single user -> SELECT * FROM users WHERE id = {user_id}
@app.get('/users/{user_id}')
def get_user(user_id: int,session=Depends(get_db)):
    print(user_id)
    user=session.query(User).filter(User.id ==user_id).first()

    return user

#GET - > RETRIEVE A RESOURSE 
@app.get('/users')
def users(session=Depends(get_db)):
    users=session.query(User).all()
    #sqlalchemy for getting users 
    return users
#POST - > CREATE A RESOURCE 
@app.post('/users')
def create_user(user:CreateUserSchema,session:Session=Depends(get_db)):
    new_user=User(**user.model_dump())
    session.add(new_user)
    session.commit()
#retrieve a certain user 
    session.refresh(new_user)

    #logic to create user
    return{"message":"user created succeffully","user":new_user}
#PUT/PATCH - > UPDATING A RESOURCES 
@app.patch('/users/{user_id}')
def update_user(user_id:int):
    print(user_id)
    return{"message":"user updated succeffully"}

#DELETE - > DELETING A RESOURCE 
@app.delete('/users/{user_id}')
def delete_user(user_id:int):
    print(user_id)
    return{"message":"user deleted succeffully"}


