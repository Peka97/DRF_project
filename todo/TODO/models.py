from django.db import models
from users.models import CustomUser


class Projects(models.Model):
    name = models.CharField(max_length=64, null=False)
    repo_link = models.CharField(max_length=256, null=True)
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    text = models.CharField(max_length=256)
    create_on = models.DateTimeField(auto_now=True)
    update_on = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
