from django.contrib import admin
from django.utils.html import format_html
from thebinaries.models import Blog, ContactMessage, OtherInformation, Project, Service, SocialMedia, Member
from thebinaries.forms import ServiceAdminForm, SocialMediaAdminForm


class ServiceAdmin(admin.ModelAdmin):
    model = Service
    form = ServiceAdminForm

    class Media:
        css = {
            'all' : ['css/widgets/select.css',]
        }
        js = ['js/widgets/select.js',]
    
    def illustration_tag(self,obj):
        return format_html(f'<img src="{obj.illustration}" style="width:150px;height:auto;"/>')

    illustration_tag.short_description = "Illustration"

    list_display = ['title','illustration_tag']
    list_display_links = ['title','illustration_tag']
    search_fields = ['title',]


class SocialMeidaInline(admin.StackedInline):
    model = SocialMedia
    form = SocialMediaAdminForm
    
    class Media:
        css = {
            'all' : ['css/widgets/select.css',]
        }
        js = ['js/widgets/select.js',]
    
    extra = 0
    classes = ['collapse']
    exclude = ['team']


class MemberAdmin(admin.ModelAdmin):
    model = Member
    inlines = [SocialMeidaInline,]

    def image_tag(self,obj):
        if(obj.photo):
            return format_html(f'<img src="{obj.photo.url}" alt="{obj.name}" width="300" height="auto"/>')
        return format_html(f'<i class="far fa-image fa-3x"></i>')

    def image_tag_small(self,obj):
        if(obj.photo):
            return format_html(f'<img src="{obj.photo.url}" alt="{obj.name}" width="150" height="auto"/>')
        return format_html(f'<i class="far fa-image fa-3x"></i>')

    def links_tag(self,obj):
        links = ""
        for link in obj.links.all():
            if(link.type() != 'link'): continue
            links += f'''<a style='margin:0.6rem 0.6rem;' href='{link.link}' target='_blank' crossorigin='anonymous'>
                <abbr title='{link.link_name}'>
                    <i class='{link.platform} fa-3x'></i>
                </abbr>
                </a>'''
        return format_html(links)

    image_tag.short_description = "Photo Preview"   
    image_tag_small.short_description = "Image"
    links_tag.short_description = "Social Medias"

    fields = ('name','description','photo','image_tag')
    list_display = ('image_tag_small','name','links_tag')
    readonly_fields = ('image_tag',)

    search_fields = ['name','description',]


class ProjectAdmin(admin.ModelAdmin):
    model = Project
    
    def image_tag(self,obj):
        if(obj.photo):
            return format_html(f'<img src="{obj.photo.url}" width="300" height="auto"/>')
        return format_html(f'<i class="far fa-image fa-3x"></i>')

    image_tag.short_description = 'Photo Preview'

    def image_tag_small(self,obj):
        if(obj.photo):
            return format_html(f'<img src="{obj.photo.url}" width="150" height="auto"/>')
        return format_html(f'<i class="far fa-image fa-3x"></i>')
    
    image_tag_small.short_description = 'Photo'

    def link_tag(self,obj):
        return format_html(f'<a href="{obj.link}" target="_blank" crossorigin="anonymous">{obj.link}</a>')

    link_tag.short_description = 'Live Link'


    fields = ['title', 'description','photo','image_tag','link']
    readonly_fields =['image_tag',]
    list_display = ['image_tag_small','link_tag','title']
    
    search_fields = ['title', 'description','link']


class BlogAdmin(admin.ModelAdmin):
    model = Blog
    
    def image_tag(self,obj):
        if(obj.photo):
            return format_html(f'<img src="{obj.photo.url}" width="300" height="auto"/>')
        return format_html(f'<i class="far fa-image fa-3x"></i>')

    image_tag.short_description = 'Photo Preview'

    def image_tag_small(self,obj):
        if(obj.photo):
            return format_html(f'<img src="{obj.photo.url}" width="150" height="auto"/>')
        return format_html(f'<i class="far fa-image fa-3x"></i>')
    
    image_tag_small.short_description = 'Photo'

    fields = ['photo','image_tag','title','description','created_date']
    readonly_fields = ['image_tag']
    list_display = ['image_tag_small','title','created_date']
    list_display_links = ['image_tag_small','title']

    search_fields = ['title','description']


class ContactMessageAdmin(admin.ModelAdmin):
    model = ContactMessage


class TeamSocialMediaInline(SocialMeidaInline):
    exclude = ['member']


class OtherInformationAdmin(admin.ModelAdmin):
    model = OtherInformation
    inlines = [TeamSocialMediaInline,]
    
    
admin.site.register(Service,ServiceAdmin)
admin.site.register(Member,MemberAdmin)
admin.site.register(Project,ProjectAdmin)
admin.site.register(Blog,BlogAdmin)
admin.site.register(OtherInformation,OtherInformationAdmin)
admin.site.register(ContactMessage,ContactMessageAdmin)
