import graphene
from graphene_django import DjangoObjectType

from users.models import CustomUser
from TODO.models import Projects, TODO


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectsType(DjangoObjectType):
    class Meta:
        model = Projects
        fields = '__all__'


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    all_projects = graphene.List(ProjectsType)
    all_todo = graphene.List(TODOType)

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_projects(root, info):
        return Projects.objects.all()

    def resolve_all_todo(root, info):
        return TODO.objects.all()


schema = graphene.Schema(query=Query)
