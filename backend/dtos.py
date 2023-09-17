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
    segments: List[object]
    language: str



class Word:
    def __init__(self, start, end, word, punct):
        self.start = start
        self.end = end
        self.word = word
        self.punct = punct
        
class ReturnValue:
    def __init__(self, punct, words: List[Word]):
        self.punct = punct
        self.words = words

class TranscriptDocument:
    def __init__(self, id, retval: ReturnValue):
        self.id = id
        self.retval = retval
