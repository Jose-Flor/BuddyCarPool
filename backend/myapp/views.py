# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.http import HttpResponse

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def submit_form(request):
    if request.method == 'POST':
        # Deserialize JSON data from request body
        data = json.loads(request.body)
        
        # Extract name and email from data
        name = data.get('name', '')
        email = data.get('email', '')
        
        # Perform any necessary processing, such as saving to database
        
        # Respond with a JSON response
        return JsonResponse({'message': 'Form submitted successfully'}, status=200)
    else:
        # Respond with error for unsupported HTTP methods
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def endpoint_view(request):
   
    return HttpResponse("This is the endpoint view")

