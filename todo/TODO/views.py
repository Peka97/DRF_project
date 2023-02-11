from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet

from .models import Projects, TODO
from .serializers import ProjectModelSerializer, TODOModelSerializer


class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectModelSerializer

class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer