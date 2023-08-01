from django.shortcuts import render
from . import models
from django.core.mail import send_mail
from .forms import ContactForm

# Create your views here.

def top_page_view(request):
    # トップページを表示するビュー関数
    template_name = "01_Home.html"
    
    # ポートフォリオアイテムの一覧を取得
    items = models.Portfolio_Item.objects.all()
    
    return render(request, template_name, {'items': items})

def contact_form_view(request):
    # お問い合わせフォームを表示するビュー関数
    template_name = "contact_form.html"
    
    if request.method == 'POST':
        # POSTリクエストの場合、フォームの入力を処理する
        form = ContactForm(request.POST)
        
        if form.is_valid():
            # フォームの入力が有効な場合の処理
            name = form.cleaned_data['name']
            company = form.cleaned_data['company']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            
            # 入力データをデータベースに保存
            contact_message = models.ContactMessage(name=name, company=company, email=email, message=message)
            contact_message.save()
            
            # 管理者に新しいお問い合わせメッセージを送信
            # send_mail(
            #     'New contact message: ' + contact_message.name,
            #     'company:\n' + contact_message.company + "\n\n" +
            #     'email-address:\n' + contact_message.email + "\n\n" +
            #     'message:\n' + contact_message.message,
            #     'm8810.work.0119@gmail.com',  # 送信元メールアドレス
            #     ['m8810.gt.0119@gmail.com'],  # 管理者のメールアドレス
            #     fail_silently=False,
            # )
            
        return render(request, 'contact_success.html', {'form': form, 'success': True})
    
    else:
        # GETリクエストの場合、フォームを初期化して表示
        form = ContactForm()
    
    return render(request, template_name, {"form": form, 'success': False})

def project_page_view(request, pk):
    # プロジェクト詳細ページを表示するビュー関数
    template_name = "02_Contents.html"
    
    # 指定されたIDに対応するポートフォリオアイテムを取得
    item = models.Portfolio_Item.objects.get(pk=pk)
    
    return render(request, template_name, {'item': item})
