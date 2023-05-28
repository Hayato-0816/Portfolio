from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.Portfolio_Item)
admin.site.register(models.ContactMessage)