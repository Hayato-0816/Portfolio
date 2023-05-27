from django.urls import path
from . import views

urlpatterns = [
    path('top/', views.top_page, name="top"),
    path('project/<int:pk>/', views.project_page, name="project"),
]