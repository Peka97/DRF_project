from django.db import models
from ..users.models import User


class Projects(models.Model):
    name = models.CharField(max_length=64, null=False)
    repo_link = models.CharField(max_length=256, null=True)
    user = models.ForeignKey(User, on_delete = models.CASCADE)


class TODO(models.Model):
    project = models.ForeignKey(Projects.name, on_delete=model.CASCADE)
    text = models.CharField(max_length=256)
    create_on = models.DateTimeField(auto_now=True)
    update_on = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=model.CASCADE)
    is_active = models.BooleanField(default=True)
