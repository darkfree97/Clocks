# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-24 18:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TimeBelt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.TextField(blank=True, max_length=50, null=True, verbose_name='City')),
                ('gmt', models.SmallIntegerField(max_length=2, verbose_name='GMT')),
            ],
        ),
    ]
