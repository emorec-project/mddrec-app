from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.views import View
import os

@csrf_exempt
def upload(request):
    if request.method == 'POST':
        blob = request.FILES['file']

        with open('/path/to/local/video.mp4', 'ab') as output_file:  # Make sure to update the path
            if os.path.getsize(output_file.name) == 0: 
                output_file.write(blob.read())
            else:
                output_file.write(blob.read()[44:])  # Skip the header as it only needs to be written once
                
        return JsonResponse({'message': 'Blob received and written to file.'})

    else:
        return JsonResponse({'error': 'Invalid request method'})


class UploadView(View):
    def post(self, request):
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file in request.'}, status=400)

        file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(file.name, file)
        file_url = fs.url(filename)

        return JsonResponse({'file_url': file_url})
