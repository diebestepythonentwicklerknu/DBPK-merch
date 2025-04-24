from django.shortcuts import render

def home(request):
    return render(request, 'main/home.html', {
        'title': 'Welcome to Our Store',
        'message': 'This is a simple interface to test our Docker setup.'
    }) 