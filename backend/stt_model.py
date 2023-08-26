import whisper

def get_stt_from_path(path, is_escaped = True):
    escaped_path = str(path) if is_escaped else str(path).replace("\\", "\\\\")
    model = whisper.load_model('base')
    result = model.transcribe(escaped_path, fp16=False)
    return result['text']
