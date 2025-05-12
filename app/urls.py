from django.urls import path
from .views import try_model_list, try_model_new, try_model_update, try_model_delete

urlpatterns = [
    path('try_models_list/', try_model_list, name='try_model_list'),
    path('try_models_new/', try_model_new, name='try_model_new'),
    path('try_models_update/<int:pk>/', try_model_update, name='try_model_update'),
    path('try_models_delete/<int:pk>/', try_model_delete, name='try_model_delete'),
]