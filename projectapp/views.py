from django.shortcuts import render
from .models import Portfolio_Item
from django.core.mail import send_mail
from .forms import ContactForm

# Create your views here.
def top_page(request):
    items = Portfolio_Item.objects.all()
    return render(request, 'base.html', {'items':items})

def project_page(request,pk):
    item = Portfolio_Item.objects.get(pk=pk)
    return render(request, 'project.html', {'item':item})

def contact_view(request,top_page):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            send_mail(
                'New contact message',
                'A new message has been received.',
                'm8810.work.0119@gmail.com',  # 送信元メールアドレス
                ['m8810.gt.0119@gmail.com'],  # 管理者のメールアドレス
                fail_silently=False,
            )
            return render(request, 'contact/base.html')
    else:
        form = ContactForm()
    return render(request, 'contact/base.html', {'form': form})