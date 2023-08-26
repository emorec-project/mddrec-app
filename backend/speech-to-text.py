import whisper

model = whisper.load_model('base')
path = r'C:\Users\Shira\Documents\Hackathon 2023\code\AVEC_patient_300_self_recording_for_test.wav'
rel_path = r'backend\uploads\AVEC_patient_300_self_recording_for_test.wav'
# result = model.transcribe(rel_path, fp16=False)
# print(result['text'])

def get_stt_from_path(path):
    result = model.transcribe(path, fp16=False)
    return result['text']

stt = get_stt_from_path(rel_path)
print(stt)