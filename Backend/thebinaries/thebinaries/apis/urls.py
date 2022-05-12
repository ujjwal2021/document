from django.urls import path,include

from thebinaries.apis.views import (
    blogs, 
    contact_message, 
    information, 
    members, 
    projects, 
    services
)

urlpatterns = [
    path('services/',services, name="services"),
    path('projects/',projects, name="projects"),
    path('members/',members, name="members"),
    path('blogs/',blogs, name="blogs"),
    path('info/',information,name="information"),
    path('message/',contact_message,name="contact-message")
]