from django.urls import path
from . import views

urlpatterns = [
    path('top/', views.top_page_view, name="top"),
    path('project/<int:pk>/', views.project_page_view, name="project"),
    path('contact/', views.contact_form_view, name="contact"),
]