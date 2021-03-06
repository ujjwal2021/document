# Generated by Django 3.2.6 on 2021-09-01 15:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('thebinaries', '0003_auto_20210901_2101'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, upload_to='projects/', verbose_name='Project Photo ')),
                ('title', models.CharField(blank=True, max_length=255, verbose_name='Title')),
                ('description', models.TextField(blank=True, max_length=2000, verbose_name='Description')),
                ('link', models.URLField(verbose_name='Live Link')),
            ],
            options={
                'verbose_name': 'Project',
                'verbose_name_plural': 'Projects',
            },
        ),
        migrations.AlterField(
            model_name='socialmedia',
            name='link',
            field=models.CharField(help_text='This can contain Number, Email address and Link. Choose according to platform.', max_length=2083, verbose_name='Link | Number | Email '),
        ),
        migrations.AlterField(
            model_name='socialmedia',
            name='link_name',
            field=models.CharField(help_text='For example : Facebook page , Whatsapp number etc.', max_length=255, verbose_name='Link Name '),
        ),
        migrations.AlterField(
            model_name='socialmedia',
            name='member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='links', to='thebinaries.member'),
        ),
        migrations.AlterField(
            model_name='socialmedia',
            name='platform',
            field=models.CharField(choices=[('Number', (('PH fas fa-phone-alt', 'Phone'), ('WA fab fa-whatsapp', 'Whatsapp'), ('VB fab fa-viber', 'Viber'))), ('Mail', (('EM fas fa-envelope', 'Email'), ('EM fab fa-google', 'Gmail'))), ('link', (('FB fab fa-facebook', 'Facebook'), ('IG fab fa-instagram', 'Instagram'), ('LI fab fa-linkedin', 'LinkedIn'), ('TW fab fa-twitter', 'Twitter'), ('YT fab fa-youtube', 'Youtube'), ('TG fab fa-telegram-plane', 'Telegram'), ('RD fab fa-reddit', 'Reddit'), ('SK fab fa-skype', 'Skype'), ('TR fab fa-tumblr-square', 'Tumblr'), ('TT fab fa-tiktok', 'Tiktok'), ('OT fas fa-link', 'Others')))], max_length=100, verbose_name='platform '),
        ),
    ]
