from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.generics import UpdateAPIView
from rest_framework.pagination import LimitOffsetPagination


from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerWithStatusInfo


class CustomUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 100


class CustomUserLimitOffsetPaginatonViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CustomUserLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return CustomUserModelSerializerWithStatusInfo
        return CustomUserModelSerializer

