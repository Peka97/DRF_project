from django_filters import rest_framework as filters
from .models import Projects, TODO


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Projects
        fields = ['name']


class TODOFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = TODO
        fields = ['project_id']
