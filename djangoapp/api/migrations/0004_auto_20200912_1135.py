# Generated by Django 3.1.1 on 2020-09-12 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_interviewquestion'),
    ]

    operations = [
        migrations.AddField(
            model_name='interviewresponse',
            name='q',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.interviewquestion'),
        ),
        migrations.AlterField(
            model_name='interviewquestion',
            name='category',
            field=models.CharField(choices=[('experience', 'experience'), ('company', 'company'), ('career', 'career'), ('personal', 'personal')], default='personal', max_length=200),
        ),
    ]
