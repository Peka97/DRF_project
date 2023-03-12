from rest_framework.serializers import ModelSerializer

from .models import CustomUser


class CustomUserModelSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        # fields = '__all__'
        fields = ('username', 'first_name', 'last_name', 'email')


class CustomUserModelSerializerWithStatusInfo(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser')
