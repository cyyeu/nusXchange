# Generated by Django 3.2 on 2021-05-28 13:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_userprofile_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='phone',
        ),
    ]