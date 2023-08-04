from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.views import View
import os

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class UploadView(View):
    def post(self, request):
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file in request.'}, status=400)

        file_obj = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(file_obj.name, file_obj)
        file_url = fs.url(filename)

        return JsonResponse({'file_url': file_url})

