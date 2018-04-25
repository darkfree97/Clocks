from datetime import datetime, tzinfo, timedelta

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from rest_framework import serializers


class Zone(tzinfo):
    def __init__(self, offset, isdst, name):
        self.offset = offset
        self.isdst = isdst
        self.name = name

    def utcoffset(self, dt):
        return timedelta(hours=self.offset) + self.dst(dt)

    def dst(self, dt):
        return timedelta(hours=1) if self.isdst else timedelta(0)

    def tzname(self, dt):
        return self.name


class TimeBelt(models.Model):
    city = models.CharField(max_length=50, verbose_name="City", blank=True, null=True)
    gmt = models.IntegerField(verbose_name="GMT", unique=True)

    def time(self):
        return datetime.now(Zone(self.gmt, False, "UTC"+str(self.gmt))).strftime("%H:%M")

    def __str__(self):
        return self.time()+" - GMT("+str(self.gmt)+")"+ (" - "+self.city if self.city else "")


class TimeBeltSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeBelt
        fields = [
            'id',
            'city',
            'gmt',
            'time',
        ]
