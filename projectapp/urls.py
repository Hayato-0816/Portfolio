from django.urls import path
from . import views

urlpatterns = [
    path('top/', views.project_list, name="projects"),
]