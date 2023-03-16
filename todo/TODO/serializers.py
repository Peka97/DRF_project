from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from .models import Projects, TODO


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Projects
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):

    class Meta:
        model = TODO
        fields = '__all__'
