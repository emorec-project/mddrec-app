import pymongo
from dtos import Document

MONGO_ID = "_id"
DOCUMENT_ID = "id"

myclient = pymongo.MongoClient("mongodb+srv://mdd-access:mdd-read-write@learn0.fu403zg.mongodb.net/")
mydb = myclient["learn0"]
mycol = mydb["sample"]

def find_doc_by_id(_id: str):
    result = mycol.find_one({MONGO_ID: _id})
    return result

#will throw error if document allready exist
def insert_doc(doc: Document):
    mongoDoc = create_mongo_doc(doc)
    help = [dict(mongoDoc)]
    result = mycol.insert_many(help)
    print(result.inserted_ids)
    return {"insertedDoc": result.inserted_ids[0]}

#will throw error if document allready exist
def insert_docs(docs : list[Document]):
    docs =map(create_mongo_doc,docs)
    result = mycol.insert_many(docs)
    print(result.inserted_ids)
    return {"insertedDocsIds": result.inserted_ids}

def create_mongo_doc(doc: Document):
    mongoDoc = dict(doc)
    mongoDoc[MONGO_ID] = mongoDoc[DOCUMENT_ID]
    return mongoDoc