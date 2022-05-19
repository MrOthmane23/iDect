# Generated by Django 4.0.3 on 2022-05-19 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_anomaly_dateano'),
    ]

    operations = [
        migrations.CreateModel(
            name='Jsonnn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('desc', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=50)),
                ('url', models.CharField(max_length=50)),
                ('dateAno', models.DateField(auto_now=True, null=True)),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
            ],
        ),
    ]