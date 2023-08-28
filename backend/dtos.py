from pydantic import BaseModel, Field

class Document  (BaseModel):
    id: str = Field(..., alias="_id")
    text: str
