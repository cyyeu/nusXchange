# Generated by Django 3.2 on 2021-06-02 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_userprofile_user_bio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_xp',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
