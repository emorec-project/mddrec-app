from pydantic import BaseModel
from typing import Optional, List


class UserDetails(BaseModel):
    email: str
    password: str
    selectedTherapist: Optional[str]

class UserRegister(BaseModel):
    user_type: str
    details: UserDetails
    