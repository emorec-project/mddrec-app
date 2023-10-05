from pydantic import BaseModel
from typing import Literal, Optional, List
    
class UserDetails(BaseModel):
    user_type: Literal['therapist', 'patient']
    email: str
    password: str
    selected_therapist: Optional[str] = None


class UserInDB(BaseModel):
    email: str
    hashed_password: str
    user_type: Literal['therapist', 'patient']
    selected_therapist: Optional[str] = None

    class Config:
        extra = "ignore"