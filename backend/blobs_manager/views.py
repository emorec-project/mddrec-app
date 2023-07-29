from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
