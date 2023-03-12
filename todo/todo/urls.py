from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


from users.views import CustomUserLimitOffsetPaginatonViewSet
from TODO.views import ProjectLimitOffsetPaginatonViewSet, TODOLimitOffsetPaginatonViewSet


router = DefaultRouter()
router.register('users', CustomUserLimitOffsetPaginatonViewSet)
router.register('projects', ProjectLimitOffsetPaginatonViewSet)
router.register('TODO', TODOLimitOffsetPaginatonViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    re_path(r'^api/(?P<version>\d\.\d)/users/',
            CustomUserLimitOffsetPaginatonViewSet.as_view({'get': 'list'})),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
]
