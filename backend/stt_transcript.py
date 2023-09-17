from data import mongo
from convert_to_transcript_format import convert_to_transcript_doc

def get_transript_file(id):
    mongo_doc = mongo.find_doc_by_id(id)
    return convert_to_transcript_doc(mongo_doc)
    