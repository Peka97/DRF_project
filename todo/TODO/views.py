from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.generics import DestroyAPIView, UpdateAPIView

from .models import Projects, TODO
from .serializers import ProjectModelSerializer, TODOModelSerializer
from .filters import ProjectFilter, TODOFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectLimitOffsetPaginatonViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOLimitOffsetPaginatonViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_class = TODOFilter

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=HTTP_200_OK)
        