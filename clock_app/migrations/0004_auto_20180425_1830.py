# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-25 15:30
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clock_app', '0003_auto_20180425_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timebelt',
            name='gmt',
            field=models.SmallIntegerField(unique=True, validators=[django.core.validators.MaxValueValidator(23), django.core.validators.MinValueValidator(-23)], verbose_name='GMT'),
        ),
    ]
