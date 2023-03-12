import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import (APIRequestFactory, force_authenticate,
APIClient, APISimpleTestCase, APITestCase)
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import CustomUserLimitOffsetPaginatonViewSet
from .models import CustomUser


class TestCustomUserLimitOffsetPaginatonViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.request_get = self.factory.get('/api/users/')
        self.view = CustomUserLimitOffsetPaginatonViewSet.as_view({'get': 'list'})
        self.admin = CustomUser.objects.create_superuser(
            'admin', 'admin@admin.com','admin123456'
            )

        self.client = APIClient()
        self.user = CustomUser.objects.create(username='TestUser')

    def test_unautorized_get(self):
        response = self.view(self.request_get)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_authorized_get(self):
        force_authenticate(self.request_get, self.admin)
        response = self.view(self.request_get)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_authorized_create_user(self):
        self.client.login(username='admin', password='admin123456')
        response = self.client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestCustomUserLimitOffsetPaginatonViewSet(APITestCase):
    def setUp(self):
        self.view = CustomUserLimitOffsetPaginatonViewSet.as_view({'get': 'list'})
        self.admin = CustomUser.objects.create_superuser(
            'admin', 'admin@admin.com','admin123456'
            )

    def test_unauthorized_get_user(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authorized_create_user(self):
        user = mixer.blend(CustomUser)
        self.client.login(username='admin', password='admin123456')
        response = self.client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
