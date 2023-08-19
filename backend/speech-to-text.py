import whisper

model = whisper.load_model('base')
path = r'C:\Users\Shira\Documents\Hackathon 2023\code\AVEC_patient_300_self_recording_for_test.wav'
# path = r'uploads\AVEC_patient_300_self_recording_for_test.wav'
result = model.transcribe(path, fp16=False)
print(result)
