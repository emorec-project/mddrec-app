from pydantic import BaseModel, Field
from typing import List

class Segment(BaseModel):
    id: int
    seek: int
    start: float
    end: float
    text: str
    tokens: List[int]
    temperature: float
    avg_logprob: float
    compression_ratio: float
    no_speech_prob: float

class Document (BaseModel):
    id: str = Field(..., alias="_id")
    text: str
    segments: List[Segment]
    language: str

