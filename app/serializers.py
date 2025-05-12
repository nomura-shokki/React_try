from rest_framework import serializers
from .models import try_model

class TryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = try_model
        fields = "__all__"