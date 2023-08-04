from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.views import View
import os
from django.core.files.base import ContentFile

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class UploadView(View):
    def post(self, request):
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file in request.'}, status=400)

        file_obj = request.FILES['file']
        filename = request.POST['filename']
        chunk_index = int(request.POST['chunkIndex'])
        chunks_count = int(request.POST['chunksCount'])

        fs_storage = FileSystemStorage(location=os.path.join('tmp', 'chunks'))  # Temporary location to store chunks

        # Make sure the chunks directory exists
        os.makedirs(fs_storage.location, exist_ok=True)

        chunk_filename = f'{filename}_chunk_{chunk_index}'  # Name for the temporary chunk file

        # Write the chunk to a temporary file
        with open(fs_storage.path(chunk_filename), 'wb') as f:
            f.write(file_obj.read())

        # Check if all chunks have been received
        if len(os.listdir(fs_storage.location)) == chunks_count:
            # If all chunks are received, combine them into the final file
            final_storage = FileSystemStorage()  # Final location to store the file
            final_dir = os.path.dirname(final_storage.path(filename))
            
            # Make sure the final directory exists
            os.makedirs(final_dir, exist_ok=True)

            final_file_path = final_storage.path(filename)

            with open(final_file_path, 'wb') as final_file:
                for i in range(chunks_count):
                    chunk_filename = f'{filename}_chunk_{i}'
                    with open(fs_storage.path(chunk_filename), 'rb') as chunk_file:
                        final_file.write(chunk_file.read())
                    os.remove(fs_storage.path(chunk_filename))  # Delete chunk file after it has been written to the final file

            file_url = final_storage.url(filename)
            return JsonResponse({'file_url': file_url})

        return JsonResponse({'message': 'Chunk received.'})
