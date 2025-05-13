from django.contrib import admin
from django.urls import path,include
from app.views import react_view  # Reactのビューをインポート

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),  # API用のURLエンドポイント
    path('', react_view),  # ReactのSPAにすべてのその他のURLを渡す
]