from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import try_model
from .serializers import TryModelSerializer

# 一覧取得および新規作成
@api_view(['GET', 'POST'])
def try_model_list(request):
    if request.method == 'GET':
        # 一覧取得処理
        try_models = try_model.objects.all()
        serializer = TryModelSerializer(try_models, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # 新規作成処理
        serializer = TryModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 個別取得、更新、削除
@api_view(['GET', 'PUT', 'DELETE'])
def try_model_detail(request, pk):
    try:
        item = try_model.objects.get(pk=pk)
    except try_model.DoesNotExist:
        return Response({'error': '対象データが存在しません。'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # 個別取得処理
        serializer = TryModelSerializer(item)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # 更新処理
        serializer = TryModelSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # 削除処理
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)