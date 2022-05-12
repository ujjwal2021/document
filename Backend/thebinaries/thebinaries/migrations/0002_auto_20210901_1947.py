# Generated by Django 3.2.6 on 2021-09-01 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thebinaries', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='illurstration',
        ),
        migrations.AddField(
            model_name='service',
            name='illustration',
            field=models.CharField(choices=[('1', 'Web Design'), ('/static/images/illustrations/web_dev.png', 'Web Development'), ('/static/images/illustrations/ui_ux.png', 'UI/UX'), ('/static/images/illustrations/app_dev.png', 'App Development'), ('/static/images/illustrations/digital_m.png', 'Digital Marketing'), ('/static/images/illustrations/seo.png', 'SEO')], default='', max_length=1028, verbose_name='Service Illustration'),
            preserve_default=False,
        ),
    ]
