from django import forms 
from thebinaries.models import Service, SocialMedia,Member
from thebinaries.widgets import ImageSelect, IconSelect


class ServiceAdminForm(forms.ModelForm):
    class Meta:
        model = Service
        widgets = {
            'illustration':ImageSelect() 
        }
        fields = '__all__'


class SocialMediaAdminForm(forms.ModelForm):
    class Meta:
        model = SocialMedia
        widgets = {
            'platform':IconSelect()
        }
        fields = "__all__"