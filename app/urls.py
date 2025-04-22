from django.urls import path
from .views import try_model_list, try_model_detail

urlpatterns = [
    path('try_models/', try_model_list, name='try_model_list'),
    path('try_models/<int:pk>/', try_model_detail, name='try_model_detail'),
]