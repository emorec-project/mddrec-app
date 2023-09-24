from pydantic import BaseModel
from typing import Optional, List

class UserDetails(BaseModel):
    email: str
    password: str
    selectedTherapist: Optional[str]

class UserRegister(BaseModel):
    user_type: str
    details: UserDetails

class UserInDB(BaseModel):
    email: str
    hashed_password: str

    class Config:
        extra = "ignore"