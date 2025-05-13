from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import try_model
from .serializers import TryModelSerializer
from django.shortcuts import render



def react_view(request):
    return render(request, 'index.html')  # Reactのindex.htmlを表示



@api_view(['GET'])
def try_model_list(request):
  try_models = try_model.objects.all()
  serializer = TryModelSerializer(try_models, many=True)
  return Response(serializer.data)



@api_view(['POST'])
def try_model_new(request):
  if request.method == 'POST':
    serializer = TryModelSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  else:
    pass



@api_view(['GET', 'PUT'])
def try_model_update(request, pk):
  try:
    try_model_instance = try_model.objects.get(pk=pk)
  except try_model.DoesNotExist:
    return Response({'error': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = TryModelSerializer(try_model_instance)
    return Response(serializer.data)
  
  elif request.method == 'PUT':
    serializer = TryModelSerializer(try_model_instance, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def try_model_delete(request, pk):
  try:
    try_model_instance = try_model.objects.get(pk=pk)
  except try_model.DoesNotExist:
    return Response({'error': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)

  try_model_instance.delete()
  return Response({'message': 'Record deleted'}, status=status.HTTP_204_NO_CONTENT)





