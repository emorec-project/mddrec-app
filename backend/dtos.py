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


class TranscriptDocument:
    def __init__(self, id, retval):
        self.id = id
        self.retval = ReturnValue(**retval)

class ReturnValue:
    def __init__(self, punct, words):
        self.punct = punct
        self.words = [Word(**word_data) for word_data in words]

class Word:
    def __init__(self, start, end, word, punct):
        self.start = start
        self.end = end
        self.word = word
        self.punct = punct
