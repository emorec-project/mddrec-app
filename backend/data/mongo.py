import pymongo
from dtos import Document
from config_loader import *

MONGO_ID = "_id"
DOCUMENT_ID = "id"

myclient = pymongo.MongoClient(MONGO_URL)
# myclient = pymongo.MongoClient(MONGO_DETAILS)
mydb = myclient["learn0"]
mycol = mydb["sample"]

def find_doc_by_id(_id: str):
    result = mycol.find_one({MONGO_ID: _id})
    return result

#will throw error if document already exist
def insert_doc(doc: Document):
    mongoDoc = create_mongo_doc(doc)
    result = mycol.insert_one(mongoDoc)
    return {"insertedDoc": result.inserted_id}

#will throw error if document already exist
def insert_docs(docs : list[Document]):
    docs =map(create_mongo_doc,docs)
    result = mycol.insert_many(docs)
    print(result.inserted_ids)
    return {"insertedDocsIds": result.inserted_ids}

def create_mongo_doc(doc: Document):
    mongoDoc = dict(doc)
    mongoDoc[MONGO_ID] = mongoDoc[DOCUMENT_ID]
    return mongoDoc
