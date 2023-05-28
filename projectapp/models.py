from django.db import models

# Create your models here.
class Portfolio_Item(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.ImageField(upload_to='media/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100,blank=True)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name