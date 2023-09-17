from dtos import Document, Segment, TranscriptDocument, Word, ReturnValue

def convert_segment_to_word(segment: Segment):
    return Word(start=segment['start'], end=segment['end'], word=segment['text'], punct=segment['text']) 

def convert_to_transcript_doc(stt_doc: Document):
    words_array = []
    for segment in stt_doc["segments"]:
        words_array.append(convert_segment_to_word(segment))
    return_value = ReturnValue(punct=stt_doc['text'], words=words_array)
    return TranscriptDocument(id=stt_doc['id'], retval=return_value)
        