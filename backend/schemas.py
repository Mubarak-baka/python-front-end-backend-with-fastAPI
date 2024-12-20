from pydantic import BaseModel
from typing import Optional

from pydantic import BaseModel, EmailStr
from typing import Optional

class CreateUserSchema(BaseModel):
    name: str
    email: EmailStr  #
    phone: Optional[str] = None  

    class Config:
        orm_mode = True  



class CreateMenuItemSchema(BaseModel):
    menu_item: str
    description: Optional[str] = None
    price: int
    quantity: int

    class Config:
        orm_mode = True  

class CreateOrderSchema(BaseModel):
    menu_item_id: int
    quantity: int
    price: int
    table_number: int
    user_id: int 

    class Config:
        orm_mode = True




