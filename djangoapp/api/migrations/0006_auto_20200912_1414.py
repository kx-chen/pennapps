# Generated by Django 3.1.1 on 2020-09-12 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200912_1251'),
    ]

    operations = [
        migrations.RenameField(
            model_name='interviewresponse',
            old_name='gradelevel',
            new_name='um',
        ),
        migrations.AlterField(
            model_name='interviewresponse',
            name='keyphrases',
            field=models.TextField(default='N/A'),
        ),
    ]
