from django.urls import path,include

from thebinaries.views import homepage


urlpatterns = [
    path('',include('thebinaries.apis.urls')),
    path('',homepage,name='homepage'),
]