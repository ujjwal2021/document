import threading
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver 
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail

RECEIVER_EMAILS = ['nikhilthakur281@gmail.com']

ILLUSTRATIONS = (
    ('/static/images/illustrations/web_design.png','Web Design'),
    ('/static/images/illustrations/web_dev.png','Web Development'),
    ('/static/images/illustrations/ui_ux.png','UI/UX'),
    ('/static/images/illustrations/app_dev.png','App Development'),
    ('/static/images/illustrations/digital_m.png','Digital Marketing'),
    ('/static/images/illustrations/seo.png','SEO'),
)

SOCIAL_MEDIA_ICONS = (
    ('Number',(
        ('PH fas fa-phone-alt','Phone'),
        ('WA fab fa-whatsapp','Whatsapp'),
        ('VB fab fa-viber','Viber'),
    )),
    ('Mail',(
        ('EM fas fa-envelope','Email'),
        ('EM fab fa-google','Gmail'),
    )),
    ('link',(
        ('FB fab fa-facebook','Facebook'),
        ('IG fab fa-instagram','Instagram'),
        ('LI fab fa-linkedin','LinkedIn'),
        ('TW fab fa-twitter','Twitter'),
        ('YT fab fa-youtube','Youtube'),
        ('TG fab fa-telegram-plane','Telegram'),
        ('RD fab fa-reddit','Reddit'),
        ('SK fab fa-skype','Skype'),
        ('TR fab fa-tumblr-square','Tumblr'),
        ('TT fab fa-tiktok','Tiktok'),
        ('OT fas fa-link','Others'),
    )),
)


class Service(models.Model):
    class Meta:
        verbose_name = _('Service')
        verbose_name_plural = _('Services')

    illustration = models.CharField(_("Service Illustration"),max_length=1028,choices=ILLUSTRATIONS)
    title = models.CharField(_("Service Title"),max_length=100)
    description = models.TextField(_("Service Description"),max_length=2000)

    def __str__(self):
        return self.title


class Member(models.Model):
    class Meta:
        verbose_name = _("Team Member")
        verbose_name_plural = _("Team Members")
    
    name = models.CharField(_("Name"),max_length=100)
    photo = models.ImageField(_("Photo"),upload_to='members/',blank=True)
    description = models.TextField(_("Description"),max_length="2000")

    def __str__(self):
        return self.name


class Project(models.Model):
    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")
    
    photo = models.ImageField(_("Project Photo "),upload_to='projects/',blank=True)
    title = models.CharField(_("Title"),max_length=255,blank=True)
    description = models.TextField(_("Description"),max_length=2000,blank=True)
    link = models.URLField(_("Live Link"))

    def __str__(self):
        return self.link


class Blog(models.Model):
    class Meta:
        verbose_name = _("Blog")
        verbose_name_plural = _("Blogs")
    
    photo = models.ImageField(_("Blog Photo"),upload_to="blogs/",blank=True)
    title = models.CharField(_("Title"),max_length=255)
    description = models.TextField(_("Description"))
    created_date = models.DateTimeField(_("Created Date"),default=timezone.now)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    class Meta:
        verbose_name = _("Contact Message")
        verbose_name_plural = _("Contact Messages")
    
    name = models.CharField(_("Name"), max_length=100)
    email = models.EmailField(_("Email"))
    message = models.TextField(_("Message"),max_length=2000)
    created_date = models.DateTimeField(_("Created Date"),auto_now_add=True)

    def __str__(self):
        return f'{self.name} | {self.email}'


class OtherInformation(models.Model):
    class Meta:
        verbose_name = _("Other Information")
        verbose_name_plural = _("Other Informations")
    
    email = models.EmailField(_("Email"))
    phone = models.CharField(_("Phone Numbers"),max_length=256,help_text="Can add multiple phone numbers by seperating with space .")
    about = models.TextField(_("About"),max_length=1000,blank=True)
    tagline = models.CharField(_("Tagline"),max_length=256,blank=True)
    tagline_description = models.TextField(_("Talgine Bio"),max_length=1000,blank=True)
    locations = models.TextField(_("Location"),max_length=2000,blank=True)


    def __str__(self):
        return 'The Binaries'


class SocialMedia(models.Model):
    class Meta:
        verbose_name = _("Social Media")
        verbose_name_plural = _("Social Medias")

    member = models.ForeignKey(Member,on_delete=models.CASCADE,related_name="links",blank=True,null=True)
    team = models.ForeignKey(OtherInformation, on_delete=models.CASCADE,related_name="medias",blank=True,null=True)
    platform = models.CharField(_("platform "),choices=SOCIAL_MEDIA_ICONS,max_length=100)
    link_name = models.CharField(_("Link Name "),max_length=255,help_text=_('For example : Facebook page , Whatsapp number etc.'))
    link = models.CharField(_("Link | Number | Email "),max_length=2083,help_text=_('This can contain Number, Email address and Link. Choose according to platform.'))

    def __str__(self):
        return f'{self.link_name}'

    def type(self):
        types = {
            'WA':'number',
            "VB":'number',
            "PH":'number',
            "EM":'email',
        }

        return types.get(self.platform[0:2],'link')





#--------------------  message email ---------------------
def get_message(instance):
    date = timezone.localtime(instance.created_date)

    return f'''
        Sender's name : {instance.name} address
        Email : {instance.email} 
        Message : {instance.message} 
        Sent on : {date.strftime("%Y-%m-%d at %H:%M:%S")}
    '''

def purify_html(data):
    return str(data).replace('<','&lt;').replace('>','&gt;')

def get_html_message(instance):
    date = timezone.localtime(instance.created_date)

    return f'''
            <div style="font-size:0.9rem;"> 
                <p>
                    Sender's name : {purify_html(instance.name)}
                </p>
                <p>
                    Email : {purify_html(instance.email)}
                </p>
                <p>
                    Message : {purify_html(instance.message)}
                </p>
                <p>
                    Sent on : {date.strftime("%Y-%m-%d at %H:%M:%S")}
                </p>
            </div>
    '''

class EmailThread(threading.Thread):
    def __init__(self,sender,instance,created,to):
        self.sender = sender
        self.instance = instance
        self.created = created
        self.to = to
        super(EmailThread, self).__init__()

    def run(self):
        from_email = settings.DEFAULT_FROM_EMAIL
        subject = f'Message - {self.instance.name}'
    
        message = get_message(self.instance)
        html_message = get_html_message(self.instance)

        send_mail(
            subject,
            message,
            from_email,
            self.to,
            fail_silently=True,
            html_message = html_message,
        )



@receiver(post_save,sender=ContactMessage)
def send_email(sender,instance,created,**kwargs):
    if created:
        try:
            to = RECEIVER_EMAILS
        except AttributeError:
            return

        EmailThread(sender, instance, created,to).start()