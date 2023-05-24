from django.shortcuts import render
from .models import Portfolio_Item

# Create your views here.
def project_list(request):
    items = Portfolio_Item.objects.all()
    return render(request, 'base.html', {'items':items})